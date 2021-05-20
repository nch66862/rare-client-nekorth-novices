import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { UserContext } from "./UserProvider";

export const UserDetail = () => {
    const { getUserById, changeSubscribed, checkSubscribed, changeAuthorStatus } = useContext(UserContext)
    const [rareUser, setRareUser] = useState({})
    const { userId } = useParams()
    const [subscribed, setSubscribed] = useState(false)
    const history = useHistory()
    useEffect(() => {
        getUserById(userId).then(setRareUser)
    }, [subscribed])
    useEffect(() => {
        if (userId && rareUser.id) {
            checkSubscribed(parseInt(rareUser.id)).then(res => setSubscribed(res.subscribed))
        }
    }, [rareUser])
    const handleActivate = () => {
        changeAuthorStatus(rareUser.id, "activate").then(res => getUserById(rareUser.id)).then(setRareUser)
    }
    const handleDeactivate = () => {
        changeAuthorStatus(rareUser.id, "deactivate").then(res => getUserById(rareUser.id)).then(setRareUser)
    }
    const handleSubscribeClicked = () => {
        let subscription = {
            "author_id": rareUser.id,
        }
        if (subscribed) {
            changeSubscribed(false, subscription).then(setSubscribed(false))
        } else {
            changeSubscribed(true, subscription).then(setSubscribed(true))
        }

    }
    return (
        <>
            <Card>
                <CardImg top width="100%" src={rareUser.profile_image ? rareUser.profile_image : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h4">@{rareUser.user?.username}</CardTitle>
                    <CardSubtitle tag="h5" className="mb-2 text-muted">{rareUser.user?.first_name} {rareUser.user?.last_name}</CardSubtitle>
                    <CardText>
                        {rareUser.user?.email} <br></br>
                            admin: {String(rareUser.user?.is_staff)}<br></br>
                            active: {String(rareUser.user?.is_active)}<br></br>
                            Created On : {new Date(rareUser.created_on).toLocaleDateString("en-us")}<br></br>
                            subscriber count: {rareUser.subscribers}<br></br>
                            subscribed: {String(subscribed)}
                    </CardText>
                    {localStorage.getItem("rare_user_admin") === "true" && !rareUser.user?.is_active ? <Button onClick={handleActivate}>Activate</Button> :
                    localStorage.getItem("rare_user_admin") === "true" && rareUser.user?.is_active && <Button onClick={handleDeactivate}>Deactivate</Button>}
                    {rareUser.user?.is_active && <Button onClick={handleSubscribeClicked}>{subscribed ? "Unsubcribe" : "Subscribe"}</Button>}
                    {localStorage.getItem("rare_user_admin") === "true" && <Button onClick={() => history.push(`/users/detail/${rareUser.id}/edit`)}>edit</Button>}
                </CardBody>
            </Card>
        </>
    )
}