import React, { useContext } from "react"
import { ListGroupItem } from 'reactstrap';
import { CommentContext } from "./CommentProvider";
import {Button} from "reactstrap"
import { PostContext } from "../post/PostProvider";

export const CommentCard = (props) => {
  const {deleteComment, setNewComment} = useContext(CommentContext)
  const {getPostById} = useContext(PostContext)

  const renderButtons = () => {
    if (props.comment.owner){
      return (
        <>
          <Button onClick={event => handleDeleteButtonClick(event)} id={`delete--${props.comment.id}`}>Delete</Button>
          <Button onClick={event => handleEditButtonClick(event)} id={`edit--${props.comment.id}`}>Edit</Button>
        </>
      )
    }
    else if(localStorage.getItem("rare_user_admin") === "true"){
      return <Button onClick={event => handleDeleteButtonClick(event)} id={`delete--${props.comment.id}`}>Delete</Button>
    }
  }

  const handleEditButtonClick = (event) => {
    setNewComment({
      "id": props.comment.id,
      "content":props.comment.content
    })
  }

  const handleDeleteButtonClick = (event) => {
    event.preventDefault()
    // eslint-disable-next-line
    const [prefix, id] = event.target.id.split("--")
    deleteComment(parseInt(id)).then(()=>getPostById(props.postId)).then((res)=>{ let tempPost = res.post
      tempPost.comment_set = res.comments
      props.setPost(tempPost)})
  }

  return (
    <ListGroupItem className="comment__card">
      <div className="comment__username">{props.comment.author.user.username}</div>
      <div className="comment__date">{props.comment.created_on}</div>
      <div className="comment__content">{props.comment.content}</div>
      {renderButtons()}
    </ListGroupItem>
  )
}