import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { UserProvider } from "./users/UserProvider"
import { ImageProvider } from "./images/ImageProvider"

export const Rare = () => (
    <>
        <ImageProvider>

            <Route render={() => {
                if (localStorage.getItem("rare_user_id")) {
                    return <>
                        <UserProvider>
                            <NavBar />
                            <ApplicationViews />
                        </UserProvider>
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />

            <Route path="/login" render={() => {
                if (localStorage.getItem("rare_user_id")) {
                    return <Redirect to="/" />
                } else {
                    return <Login />
                }
            }} />

            <Route path="/register" render={() => {
                if (localStorage.getItem("rare_user_id")) {
                    return <Redirect to="/" />
                } else {
                    return <Register />
                }
            }} />
        </ImageProvider>
    </>
)
