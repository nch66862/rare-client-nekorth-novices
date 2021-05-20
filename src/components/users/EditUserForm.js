import { Button } from "reactstrap";
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import "../auth/Auth.css"
import { UserContext } from "./UserProvider"

export const EditUserForm = () => {
    const history = useHistory()
    const { userId } = useParams()
    const { getUserById, updateUser } = useContext(UserContext)
    const [editedUser, setEditedUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        email: ""
    })
    useEffect(() => {
        getUserById(userId)
            .then(rareUser => {
                setEditedUser({
                    id: rareUser.id,
                    firstName: rareUser.user.first_name,
                    lastName: rareUser.user.last_name,
                    username: rareUser.user.username,
                    bio: rareUser.bio,
                    email: rareUser.user.email
                })
            })
    }, [])
    const handleEditUser = () => {
        updateUser(editedUser)
            .then(() => history.push(`/users/detail/${editedUser.id}`))
    }
    const handleEditField = (event) => {
        let newUserObj = {...editedUser}
        newUserObj[event.target.name] = event.target.value
        setEditedUser(newUserObj)
    }
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleEditUser}>
                <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleEditField} value={editedUser.firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleEditField} value={editedUser.lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="displayName"> Username </label>
                    <input onChange={handleEditField} value={editedUser.username} type="text" name="username" className="form-control" placeholder="Display name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={handleEditField} value={editedUser.bio} type="text" name="bio" className="form-control" placeholder="Bio"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input onChange={handleEditField} value={editedUser.email} type="email" name="email" className="form-control" placeholder="Email address" required />
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