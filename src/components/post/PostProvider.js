import React, { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {

  const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }
  const searchPosts = (search) => {
    return fetch(`http://localhost:8000/posts?q=${search}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }
    })
    .then(res=> res.json())
  }

  const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }

  const getPostsByUserId = () => {
    return fetch(`http://localhost:8000/posts?user_id=1`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
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
    return fetch(`http://localhost:8000/posts/approved`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({"postId":postId})
    })
  }
  const sortPostsByCategory = (sort) => {
    return fetch(`http://localhost:8000/posts?category=${sort}`,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  const sortPostsByUser = (sort) => {
    return fetch(`http://localhost:8000/posts?user=${sort}`,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`,{
      method:"DELETE",
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
  }
  const editPost = (post, postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(post)
    })
  }
  const getUnapprovedPosts = () => {
    return fetch(`http://localhost:8000/posts?unapproved=true`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  

  return (
    <PostContext.Provider value={{
      getPostById, createPost, getAllPosts, getPostsByUserId, approvePost, deletePost, editPost, sortPostsByCategory, searchPosts, sortPostsByUser, getUnapprovedPosts
    }}>
      {props.children}
    </PostContext.Provider>
  )
}