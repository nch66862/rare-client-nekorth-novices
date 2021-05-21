import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { CommentCard } from "../comment/CommentCard"
import { CommentForm } from "../comment/CommentForm"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comment/CommentProvider"
import { ReactionContext } from "../reaction/ReactionProvider"
import "./PostDetail.css"
import {
  Card, CardText, CardBody, CardImg,
  CardTitle, CardSubtitle, Button, 
  ListGroup, Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem
} from 'reactstrap';
export const PostDetail = () => {
  const {getPostById} = useContext(PostContext)
  const {getReactions, reactions, addPostReaction} = useContext(ReactionContext)

  const [post, setPost] = useState({
    'id': 0,
    'category': 0,
    'title': "",
    'user':{},
    'publication_date': "",
    'image_url': "",
    'content': "",
    'approved': false,
    'tag_set': [],
    'comment_set': [],
    'postreaction_set': []
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {postId} = useParams()
  const currentUser = parseInt(localStorage.getItem("rare_user_id"))

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleReactionInput = (event) => {
      const newReaction = {
        "reaction_id": parseInt(event.target.id),
        "post_id": post.id
      }
      addPostReaction(newReaction).then(()=>getPostById(parseInt(postId)).then(res => {let tempPost = res.post
        tempPost.comment_set = res.comments
        setPost(tempPost)}))
  }

  useEffect(() => {
    getPostById(parseInt(postId))
    .then(res => {let tempPost = res.post
                  tempPost.comment_set = res.comments
                  setPost(tempPost)
                  getReactions()})
  }, [])

  return (
    <>
    {console.log(post)}
      <Card>
      <CardImg top width="100%" src={post.image_url} alt="Card image cap" />
        <CardBody>
          <CardTitle className="text-center">{post.title}</CardTitle>
          <CardSubtitle className="text-center">Category: {post.category?.label}</CardSubtitle>
          <CardSubtitle className="text-center">Author: {post.user.user?.username} | Date: {post.publication_date}</CardSubtitle>
          <CardSubtitle className="text-center">Tags: {post.tag_set?.map(tag => {
            return tag.label
          }).join(", ")}</CardSubtitle>
          <CardText className="text-center">{post.content}</CardText>
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
          {
            reactions.map(r => {
              let count = post?.postreaction_set.filter(pr => pr.reaction === r.id).length
              if(count){
                return (
                  <div className="reaction" key={r?.id} style={{display:"inline-block"}}>
                  <img className="reaction__img" src={r.image_url} alt={r.label} width="20vh" height="20vh" />
                  <div className="reaction__count" style={{display:"inline-block"}}>{count}</div>
                </div>
                )}
              else{
                return<></>
              }})}
        </div>
      </Card>
      <CommentForm postId={postId} setPost={setPost}/>
      {post.comment_set.map(comment => {
        return (
          <ListGroup key={comment.id} >
            <CommentCard comment={comment} postId={postId} setPost={setPost} />
          </ListGroup>
        )
      })}
    </>
  )
}