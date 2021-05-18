import  React, { createContext, useState } from "react";

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getAllTags = () => {
        return fetch("http://localhost:8000/tags")
        .then(res => res.json())
        .then(setTags)
    }
    const addTag = (tag) => {
        return fetch("http://localhost:8000/tags",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(getAllTags)
    }
    const deleteTag = (tagId) => {
        return fetch(`http://localhost:8000/tags/${tagId}`,{
            method: "DELETE"
        })
        .then(getAllTags)
    }
    const updateTag = (tag) => {
        return fetch(`http://localhost:8000/tags/${tag.id}`,{
            method: "PUT",
            headers:{
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