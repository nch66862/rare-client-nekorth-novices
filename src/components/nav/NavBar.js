import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./image.png"
import { UserContext } from "../users/UserProvider"

export const NavBar = () => {
    const {admin, checkAdmin} = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        
    }, [])

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
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
