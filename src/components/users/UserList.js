import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Card, Button, CardBody, CardTitle, CardText } from "reactstrap"
import { UserContext } from "./UserProvider"

export const UserList = () => {
    const {rareUsers, getAllUsers, checkAdmin} = useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
        getAllUsers()
    },[])
    return(
        <>
        {rareUsers?.map(rareUser => {
                return(
                    <Card style={{ width: '18rem' }}>
                        <CardBody>
                            <CardTitle>{rareUser.user.first_name} {rareUser.user.last_name}</CardTitle>
                            <CardText>
                            @{rareUser.user.username} <br></br>
                            admin: {String(rareUser.user.is_staff)} <br></br>
                            active: {String(rareUser.user.is_active)}
                            </CardText>
                            <Button variant="primary" onClick={e=> history.push(`/users/detail/${rareUser.id}`)}>Details</Button>
                        </CardBody>
                    </Card>
                )
        })}
        </>
    )
}