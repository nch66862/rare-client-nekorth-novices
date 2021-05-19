import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { HumanDate } from "../utils/HumanDate";
import { UserContext } from "./UserProvider";

export const UserDetail = () => {
    const {getUserById, subscribe, checkSubscribed, unsubscribe,checkAdmin, admin, changeAuthorStatus} = useContext(UserContext)
    const [user, setUser] = useState({})
    const {userId} = useParams()
    const [subscribed, setSubscribed] = useState(false)
    useEffect(()=>{
        checkAdmin()
    },[])
    useEffect(()=>{
        getUserById(userId).then(setUser)
    },[subscribed])
    useEffect(()=>{
        if(userId && user.id){
            checkSubscribed(parseInt(localStorage.getItem("rare_user_id")),user.id).then(res=> setSubscribed(res.subscribed))
        }
    },[user])
    const handlePromotionClicked = () => {
        let action
        if(user.active){
            action = "deactivate"
        }else{
            action = "activate"
        }
        changeAuthorStatus(user.id, action).then(res=>getUserById(user.id)).then(setUser)
    }
    const handleSubscribeClicked = () => {
        if(subscribed){
            let subscription = {
                "follower_id" : parseInt(localStorage.getItem("rare_user_id")),
                "author_id" : user.id,
                "ended_on" : HumanDate()
            }
            unsubscribe(subscription).then(setSubscribed(false))
        }else{
            let subscription = {
                "author_id" : user.id,
                "ended_on" : ""
            }
            subscribe(subscription).then(setSubscribed(true))
        }
            
    }
    return(
        <>
        <Card>
        <CardImg top width = "100%" src={user.profileImageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h4">{user.displayName}</CardTitle>
          <CardSubtitle tag="h5" className="mb-2 text-muted">{user.fullName}</CardSubtitle>
          <CardText>
                {user.email} <br></br>
                admin: {String(user.isAdmin)}, <br></br>
                active: {String(user.active)}, <br></br>
                Created On : {user.createdOn} <br></br>
                subscriber count: {user.subscribers} <br></br>
                subscribed: {String(subscribed)}
            </CardText>
          <Button onClick={handleSubscribeClicked}>{subscribed ? "Unsubcribe" : "Subscribe"}</Button>
          {admin ? <Button onClick={handlePromotionClicked}>{user.active ? "Deactivate": "Activate"}</Button> :<></>}
        </CardBody>
      </Card>
        </>
    )
}