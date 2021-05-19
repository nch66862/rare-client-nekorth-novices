import React, { createContext, useState } from 'react' 

export const ReactionContext = createContext()

export const ReactionProvider = props => {

    const [b64, setB64] = useState("")
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createReactionImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setB64(base64ImageString)
        });
    }

    const createReaction = reaction => {
        return fetch(`http://localhost:8000/reactions`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
            .then(response => response.json())
            .then(getReactions)
    }

    return (
        <ReactionContext.Provider value={{ createReactionImageString, b64, createReaction, getReactions, setB64, reactions }} >
            { props.children }
        </ReactionContext.Provider>
    )
}
