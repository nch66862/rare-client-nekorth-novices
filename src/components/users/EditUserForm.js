import { Button } from "reactstrap";
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import "../auth/Auth.css"
import { UserContext } from "./UserProvider"

export const EditUserForm = () => {
    const history = useHistory()
    const { rareUserId } = useParams()
    const { getUserById } = useContext(UserContext)
    const [editedUser, setEditedUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        email: ""
    })
    useEffect(() => {
        getUserById(rareUserId)
            .then(setEditedUser)
    }, [])
    const handleEditUser = () => {

    }
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleEditUser}>
                <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input value={editedUser.firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input value={editedUser.lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="displayName"> Username </label>
                    <input value={editedUser.username} type="text" name="displayName" className="form-control" placeholder="Display name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input value={editedUser.bio} type="text" name="bio" className="form-control" placeholder="Bio"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input value={editedUser.email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <Button type="submit">Submit Edit</Button>
                </fieldset>
            </form>
            <section className="link--register">
                <Button onClick={() => history.goBack()}>Go Back</Button>
            </section>
        </main>
    )
}