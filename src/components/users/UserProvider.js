import React, { createContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [rareUsers, setUsers] = useState([])
    const history = useHistory()
    const getAllUsers = () => {
        return fetch("http://localhost:8000/users",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }
    const getUserById = (userId) =>{
        return fetch(`http://localhost:8000/users/${userId}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }
    // const getSubcriptions = (userId) => {
    //     return fetch(`http://localhost:8000/subscriptions/${userId}`)
    //     .then(res => res.json())
    //     .then(res => console.log("subcriptions: ",res))
    // }
    const checkSubscribed = (followerId, authorId) => {
        return fetch("http://localhost:8000/subscribed", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "follower_id": parseInt(followerId),
                "author_id": authorId
            })
        })
            .then(res => res.json())
    }
    const subscribe = (subscription) => {
        return fetch("http://localhost:8000/subscriptions",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(subscription)
        })
    }
    const unsubscribe = (subscription) => {
        return fetch("http://localhost:8000/unsubscribe",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(subscription)
        })
    }
    const checkAuthenticated = () => {
        return fetch(`http://localhost:8000/check-active`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }
    const changeAuthorStatus = (userId, action) => {
        return fetch(`http://localhost:8000/change-active`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "action": action,
                "user_id": userId,
                "approver_one_id": parseInt(localStorage.getItem("rare_user_id"))
            })
        })
    }
    return (
        <UserContext.Provider value={{ getAllUsers, rareUsers, getUserById, subscribe, checkSubscribed, unsubscribe, changeAuthorStatus, checkAuthenticated }}>
            {props.children}
        </UserContext.Provider>
    )
}