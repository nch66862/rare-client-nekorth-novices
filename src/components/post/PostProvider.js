import React, { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {

  const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`)
    .then(res => res.json())
  }

  const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`)
    .then(res => res.json())
  }

  const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8000/posts?user_id=${userId}`)
    .then(res => res.json())
  }

  const createPost = (postBody) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
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
        "Content-Type": "application/json"
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