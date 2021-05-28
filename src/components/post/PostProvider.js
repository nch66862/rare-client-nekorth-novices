import React, { createContext } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {

  const getAllPosts = () => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }
  const searchPosts = (search) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts?q=${search}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }
    })
    .then(res=> res.json())
  }

  const getPostById = (id) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts/${id}`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }

  const getPostsByUserId = () => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts?user_id=1`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }

  const createPost = (postBody) => {
    return fetch("https://nac-rare-server.herokuapp.com/posts", {
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
    return fetch(`https://nac-rare-server.herokuapp.com/posts/approved`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({"postId":postId})
    })
  }
  const sortPostsByCategory = (sort) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts?category=${sort}`,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  const sortPostsByUser = (sort) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts?user=${sort}`,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  const deletePost = (postId) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts/${postId}`,{
      method:"DELETE",
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
  }
  const editPost = (post, postId) => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts/${postId}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(post)
    })
  }
  const getUnapprovedPosts = () => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts?unapproved=true`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    }).then(res=>res.json())
  }
  
  const getSubscribedPosts = () => {
    return fetch(`https://nac-rare-server.herokuapp.com/posts/subscribed_posts`,{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
  }

  return (
    <PostContext.Provider value={{
      getPostById, createPost, getAllPosts, getPostsByUserId, approvePost, 
      deletePost, editPost, sortPostsByCategory, searchPosts, sortPostsByUser, getSubscribedPosts, getUnapprovedPosts
    }}>
      {props.children}
    </PostContext.Provider>
  )
}