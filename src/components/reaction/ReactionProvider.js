import React, { createContext, useState } from "react"

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
  const [reactions, setReactions] = useState([])

  const getReactions = () => {
    return fetch("http://localhost:8000/reactions",{
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => res.json())
    .then(setReactions)
  }

  const createReaction = (reaction) => {
    return fetch("http://localhost:8000/reactions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reaction)
    })
    .then(getReactions)
  }

  return (
    <ReactionContext.Provider value={{
      reactions, getReactions, createReaction
    }}>
      {props.children}
    </ReactionContext.Provider>
  )
}