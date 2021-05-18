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
  const {comments} = useContext(CommentContext)
  const {getReactions, reactions} = useContext(ReactionContext)

  const [post, setPost] = useState({
    'id': 0,
    'userId': 0,
    'categoryId': 0,
    'title': "",
    'publicationDate': "",
    'imageUrl': "",
    'content': "",
    'approved': false,
    'tags': [],
    'comments': [],
    'reactions': []
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

  useEffect(() => {
    getPostById(parseInt(postId))
    .then(setPost)
    .then(getReactions)
  }, [comments])

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="text-center">{post.title}</CardTitle>
          <CardSubtitle className="text-center">{post.user?.fullName} | {post.publicationDate}</CardSubtitle>
          <CardSubtitle className="text-center">Tags: {post.tags?.map(tag => {
            return tag.label
          }).join(", ")}</CardSubtitle>
          <CardText>{post.content}</CardText>
        </CardBody>
        <div className="reactions">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            Reactions
          </DropdownToggle>
          <DropdownMenu>
          {reactions.map(reaction => {
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
        </div>
      </Card>
      <CommentForm postId={postId} />
      {post.comments.map(comment => {
        return (
          <ListGroup key={comment.id} >
            <CommentCard comment={comment} />
          </ListGroup>
        )
      })}
    </>
  )
}