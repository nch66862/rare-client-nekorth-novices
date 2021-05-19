import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { CommentCard } from "../comment/CommentCard"
import { CommentForm } from "../comment/CommentForm"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comment/CommentProvider"
import { ReactionContext } from "../reaction/ReactionProvider"
import "./PostDetail.css"
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, 
  ListGroup, Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem
} from 'reactstrap';

export const PostDetail = () => {
  const {getPostById} = useContext(PostContext)
  const {getReactions, reactions} = useContext(ReactionContext)

  const [post, setPost] = useState({
    'id': 0,
    'category': 0,
    'title': "",
    'user':{},
    'publication_date': "",
    'imageUrl': "",
    'content': "",
    'approved': false,
    'tag_set': [],
    'comment_set': [],
    'reaction_set': []
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {postId} = useParams()
  const currentUser = parseInt(localStorage.getItem("rare_user_id"))

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleReactionInput = (event) => {
      const newReaction = {
        "user_id": currentUser,
        "reaction_id": parseInt(event.target.id),
        "post_id": post.id
      }
      let newPost = {...post}
      let reactionIndex = newPost.reactions.findIndex(reaction => reaction.id === parseInt(event.target.id))
      if (newPost.reactions[reactionIndex]){
        newPost.reactions[reactionIndex].count = newPost.reactions[reactionIndex].count + 1
        setPost(newPost)
      } else{
        const foundReaction = reactions.find(reaction => reaction.id === parseInt(event.target.id))
        foundReaction.count = 1
        newPost.reactions.push(foundReaction)
        setPost(newPost)
      
    }
  }
//need to get reactions
  useEffect(() => {
    getPostById(parseInt(postId))
    .then(setPost)
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="text-center">{post.title}</CardTitle>
          <CardSubtitle className="text-center">Category: {post.category?.label}</CardSubtitle>
          <CardSubtitle className="text-center">Author: {post.user.user?.username} | Date: {post.publication_date}</CardSubtitle>
          <CardSubtitle className="text-center">Tags: {post.tag_set?.map(tag => {
            return tag.label
          }).join(", ")}</CardSubtitle>
          <CardText className="text-center">{post.content}</CardText>
        </CardBody>
        {/* <div className="reactions">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            Reactions
          </DropdownToggle>
          <DropdownMenu>
          {reactions?.map(reaction => {
            return <DropdownItem key={reaction.id} id={reaction.id} onClick={event => handleReactionInput(event)}><img src={reaction.image_url} alt={reaction.label} style={{pointerEvents:"none"}} width="20vh" height="20vh" />{reaction.label}</DropdownItem>
          })}
          </DropdownMenu>
        </Dropdown>
          {post.reactions.map(reaction => {
            return (
              <div className="reaction" key={reaction.id} style={{display:"inline-block"}}>
                <img className="reaction__img" src={reaction.image_url} alt={reaction.label} width="20vh" height="20vh" />
                <div className="reaction__count" style={{display:"inline-block"}}>{reaction.count}</div>
              </div>
            )
          })}
        </div> */}
      </Card>
      <CommentForm postId={postId} setPost={setPost}/>
      {post.comment_set.map(comment => {
        return (
          <ListGroup key={comment.id} >
            <CommentCard comment={comment} />
          </ListGroup>
        )
      })}
    </>
  )
}