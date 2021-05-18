import React, { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {

  const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
    })
    .then(res => res.json())
  }

  const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
    })
    .then(res => res.json())
  }

  const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8000/posts?user_id=${userId}`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
    })
    .then(res => res.json())
  }

  const createPost = (postBody) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postBody)
    })
    .then(res => res.json())
  }

  const approvePost = (postId) => {
    return fetch(`http://localhost:8000/approve/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify({})
    })
  }

  return (
    <PostContext.Provider value={{
      getPostById, createPost, getAllPosts, getPostsByUserId, approvePost
    }}>
      {props.children}
    </PostContext.Provider>
  )
}