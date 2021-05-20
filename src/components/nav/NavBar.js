import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./image.png"
import { UserContext } from "../users/UserProvider"

export const NavBar = () => {
    const admin = true
    const history = useHistory()
    let profile = 0

    const {getCurrentUser} = useContext(UserContext)   
    getCurrentUser()
    .then(res => profile=res)

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <button onClick={() => history.push(`/users/detail/${profile}`)}><img className="navbar__logo" src={Logo} />User Profile</button>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts/create">New Post</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts/my-posts">My Posts</Link>
            </li>
            {admin && (
                <li className="navbar__item">
                    <Link className="navbar__link" to="/posts/unapproved-posts">Unapproved Posts</Link>
                </li>
            )}
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
            {localStorage.getItem("rare_user_admin") === "true" && <li className="navbar__item">
                <Link className="navbar__link" to="/users/inactive">Inactive Users</Link>
            </li>}
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tags</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            {
                admin ? 
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/reactions">Reactions</Link>
                    </li> :
                    <></>

            }
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
