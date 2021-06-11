import React, { createContext, useState } from 'react'

export const ReactionContext = createContext()

export const ReactionProvider = props => {

    const [reactions, setReactions] = useState([])

    const getReactions = () => {
        return fetch("https://nac-rare-server.herokuapp.com/reactions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setReactions)
    }

    const createReaction = reaction => {
        return fetch(`https://nac-rare-server.herokuapp.com/reactions`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
            .then(response => response.json())
            .then(getReactions)
    }

    const deleteReaction = reactionId => {
        return fetch(`https://nac-rare-server.herokuapp.com/reactions/${reactionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            },
        })
            .then(getReactions)
    }

    const addPostReaction = reaction => {
        return fetch('https://nac-rare-server.herokuapp.com/postreactions', {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }

    return (
        <ReactionContext.Provider value={{ createReaction, getReactions, reactions, addPostReaction, deleteReaction }} >
            {props.children}
        </ReactionContext.Provider>
    )
}
