import  React, { createContext, useState } from "react";

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getAllTags = () => {
        return fetch("https://nac-rare-server.herokuapp.com/tags",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setTags)
    }
    const addTag = (tag) => {
        return fetch("https://nac-rare-server.herokuapp.com/tags",{
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(getAllTags)
    }
    const deleteTag = (tagId) => {
        return fetch(`https://nac-rare-server.herokuapp.com/tags/${tagId}`,{
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getAllTags)
    }
    const updateTag = (tag) => {
        return fetch(`https://nac-rare-server.herokuapp.com/tags/${tag.id}`,{
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(getAllTags)
    }
    return (
    <TagContext.Provider value={{getAllTags, tags, addTag, deleteTag, updateTag}}>
        {props.children}
    </TagContext.Provider>
    )
}