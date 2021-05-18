import React, { useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider"
import {Button} from "reactstrap"
import "./CommentForm.css"

export const CommentForm = (props) => {
  const {createComment, newComment, setNewComment, editComment} = useContext(CommentContext)
  const handleControlledInputChange = (event) => {
    let comment = {...newComment}
    comment[event.target.id] = event.target.value
    setNewComment(comment)
  }
  const handleSubmitClick = (event) => {
    if(newComment.id){
      editComment(newComment)
    } else{
      createComment(newComment)
    }
    setNewComment({
      "content": "",
      "post_id": props.postId
    })
  }

  useEffect(() => {
    setNewComment({
      "content": "",
      "post_id": props.postId
    })
  }, [])

  return (
    <form className="commentForm" autoComplete="off">
      <h2 className="commentForm__title">New Comment</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="content">Comment: </label>
          <input type="text" id="content" onChange={handleControlledInputChange} required className="form-control" placeholder="Comment" value={newComment.content} />
        </div>
      </fieldset>
      <Button className="btn__submit" onClick={event => {
        handleSubmitClick()
        }}>
        Submit
      </Button>
    </form>
  )
}