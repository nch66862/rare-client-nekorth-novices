import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { HumanDate } from "../utils/HumanDate";
import { UserContext } from "./UserProvider";

export const UserDetail = () => {
    const { getUserById, subscribe, checkSubscribed, unsubscribe, changeAuthorStatus } = useContext(UserContext)
    const [rareUser, setRareUser] = useState({})
    const { userId } = useParams()
    const [subscribed, setSubscribed] = useState(false)
    useEffect(() => {
        getUserById(userId).then(setRareUser)
    }, [subscribed])
    useEffect(() => {
        if (userId && rareUser.id) {
            checkSubscribed(parseInt(localStorage.getItem("rare_user_id")), rareUser.id).then(res => setSubscribed(res.subscribed))
        }
    }, [rareUser])
    const handleActivate = () => {
        changeAuthorStatus(rareUser.id, "activate").then(res => getUserById(rareUser.id)).then(setRareUser)
    }
    const handleDeactivate = () => {
        changeAuthorStatus(rareUser.id, "deactivate").then(res => getUserById(rareUser.id)).then(setRareUser)
    }
    const handleSubscribeClicked = () => {
        if (subscribed) {
            let subscription = {
                "follower_id": parseInt(localStorage.getItem("rare_user_id")),
                "author_id": rareUser.id,
                "ended_on": HumanDate()
            }
            unsubscribe(subscription).then(setSubscribed(false))
        } else {
            let subscription = {
                "follower_id": parseInt(localStorage.getItem("rare_user_id")),
                "author_id": rareUser.id,
                "created_on": HumanDate(),
                "ended_on": ""
            }
            subscribe(subscription).then(setSubscribed(true))
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
                    <Button onClick={handleSubscribeClicked}>{subscribed ? "Unsubcribe" : "Subscribe"}</Button>
                    {localStorage.getItem("rare_user_admin") === "true" && !rareUser.user?.is_active ? <Button onClick={handleActivate}>Activate</Button> :
                    localStorage.getItem("rare_user_admin") === "true" && rareUser.user?.is_active && <Button onClick={handleDeactivate}>Deactivate</Button>}
                </CardBody>
            </Card>
        </>
    )
}