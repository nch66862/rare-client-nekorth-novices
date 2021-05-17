import React, { createContext, useState } from "react"

export const PostReactionContext = createContext()

export const PostReactionProvider = (props) => {
  const [postReactions, setPostReactions] = useState([])

  const getPostReactionsById = (postId) => {
    return fetch(`http://localhost:8000/postreactions/${postId}`)
    .then(res => res.json())
    .then(setPostReactions)
  }

  const addReaction = (postReaction) => {
    return fetch("http://localhost:8000/postreactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postReaction)
    })
  }

  return (
    <PostReactionContext.Provider value={{
      postReactions, getPostReactionsById, addReaction, setPostReactions
    }}>
      {props.children}
    </PostReactionContext.Provider>
  )
}