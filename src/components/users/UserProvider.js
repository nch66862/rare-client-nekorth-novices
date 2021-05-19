import React, { createContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [rareUsers, setUsers] = useState([])
    const [admin, setAdmin] = useState(false)
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
    const checkSubscribed = (authorId) => {
        return fetch("http://localhost:8000/users/subscription_status", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "author_id": authorId
            })
        })
            .then(res => res.json())
    }
    const changeSubscribed = (subscribing, subscription) => {
        return fetch("http://localhost:8000/users/subscription",{
            method: subscribing ? "POST" : "DELETE",
            // method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
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
        return fetch(`http://localhost:8000/check-active`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                return res.valid
            })
    }
    const changeAuthorStatus = (userId, action) => {
        return fetch(`http://localhost:8000/active_status`,{
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
        <UserContext.Provider value={{ getAllUsers, rareUsers, getUserById, changeSubscribed, checkSubscribed, checkAdmin, admin, changeAuthorStatus, checkAuthenticated }}>
            {props.children}
        </UserContext.Provider>
    )
}