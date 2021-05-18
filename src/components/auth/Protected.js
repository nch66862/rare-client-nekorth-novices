import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../users/UserProvider"

export const Protected = (props) => {
    const { checkAuthenticated } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        checkAuthenticated()
            .then(valid => {
                if (valid){
                    setIsLoading(false)
                } else {
                    localStorage.removeItem("rare_user_id")
                    history.push("/login")
                }
            })
    }, [])
    return !isLoading ? props.children : null
}