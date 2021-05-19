import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../users/UserProvider"

export const Protected = (props) => {
    const { checkAuthenticated } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        checkAuthenticated()
            .then(res => {
                if (res.is_active){
                    if (res.is_admin) {
                        localStorage.setItem("rare_user_admin", "true")
                    }
                    else {
                        localStorage.setItem("rare_user_admin", "false")
                    }
                    setIsLoading(false)
                } else {
                    localStorage.removeItem("rare_user_id")
                    localStorage.removeItem("rare_user_admin")
                    history.push("/login")
                }
            })
    }, [])
    return !isLoading ? props.children : null
}