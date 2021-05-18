import React, { createContext, useState } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
  const [comments, setComments] = useState()
  const [newComment, setNewComment] = useState({
    "subject": "",
    "content": "",
    "post_id": 0,
    "author_id": 0,
    "created_on": 0
  })

  const getComments = () => {
    return fetch("http://localhost:8000/comments",{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then(res => res.json())
      .then(setComments)
  }

  const createComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
    .then(getComments)
  }

  const deleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
      method: "DELETE",
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(getComments)
  }

  const editComment = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(comment)
    })
    .then(getComments)
  }

  return (
    <CommentContext.Provider value={{
      comments, getComments, createComment, deleteComment, editComment, newComment, setNewComment
    }}>
      {props.children}
    </CommentContext.Provider>
  )
}