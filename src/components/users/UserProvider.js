import React, { createContext, useState } from "react";
import { Redirect } from "react-router-dom"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState(false)
    const getAllUsers = () => {
        return fetch("http://localhost:8000/users")
        .then(res => res.json())
        .then(setUsers)
    }
    const getUserById = (userId) =>{
        return fetch(`http://localhost:8000/users/${userId}`)
        .then(res => res.json())
    }
    // const getSubcriptions = (userId) => {
    //     return fetch(`http://localhost:8000/subscriptions/${userId}`)
    //     .then(res => res.json())
    //     .then(res => console.log("subcriptions: ",res))
    // }
    const checkSubscribed = (followerId, authorId) => {
        return fetch("http://localhost:8000/subscribed",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "follower_id" : parseInt(followerId),
                "author_id" : authorId
            })
        })
        .then(res => res.json())
    }
    const subscribe = (subscription) => {
        return fetch("http://localhost:8000/subscriptions",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(subscription)
        })
    }
    const unsubscribe = (subscription) => {
        return fetch("http://localhost:8000/unsubscribe",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(subscription)
        })
    }
    const checkAdmin = () => {
        return fetch(`http://localhost:8000/users/${localStorage.getItem("rare_user_id")}`)
        .then(res => res.json())
        .then(res => setAdmin(res.isAdmin))
    }
    const checkAuthenticated = () => {
        if (localStorage.getItem("rare_user_id")) {
        } else {
            return <Redirect to="/login" />
        }
    }
    const changeAuthorStatus = (userId, action) => {
        return fetch(`http://localhost:8000/active_status`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({"action": action,
                                    "user_id": userId,
                                    "approver_one_id": parseInt(localStorage.getItem("rare_user_id"))})
        })
    }
    return (
        <UserContext.Provider value={{getAllUsers, users, getUserById, subscribe, checkSubscribed, unsubscribe, checkAdmin, admin, changeAuthorStatus, checkAuthenticated}}>
            {props.children}
        </UserContext.Provider>
        )
} 