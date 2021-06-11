import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"


export const Login = () => {
    // const username = useRef()
    // const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    // const handleLogin = (e) => {
    //     e.preventDefault()

    //     return fetch("https://nac-rare-server.herokuapp.com/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username: username.current.value,
    //             password: password.current.value
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if ("valid" in res && res.valid) {
    //                 localStorage.setItem("rare_user_id", res.token )
    //                 history.push("/")
    //             }
    //             else {
    //                 invalidDialog.current.showModal()
    //             }
    //         })
    // }
    const handleNickSignIn = (e) => {
        e.preventDefault()
        return fetch("https://nac-rare-server.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: "nickcarver",
                password: "pass"
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("rare_user_id", res.token )
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }
    const handleJakeSignIn = (e) => {
        e.preventDefault()

        return fetch("https://nac-rare-server.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: "jakefroeb",
                password: "pass"
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("rare_user_id", res.token )
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                {/* <form className="form--login" onSubmit={handleLogin}> */}
                <form className="form--login">
                    <h1>Rare Publishing</h1>
                    <h2>Please sign in</h2>
                    <button className="btn btn-1 btn-sep icon-send" onClick={handleNickSignIn}>Sign In as Nick Carver</button>
                    <button className="btn btn-1 btn-sep icon-send" onClick={handleJakeSignIn}>Sign In as Jake Froeb</button>
                    {/* <fieldset>
                        <label htmlFor="inputEmail"> Username </label>
                        <input ref={username} type="text" id="username" className="form-control" placeholder="my rare username" required autoFocus autoComplete="username" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required autoComplete="password" />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset> */}
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
