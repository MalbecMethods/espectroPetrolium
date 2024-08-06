import "../../public/css/login.css"
import UserIcon from "../../public/images/icon-user.png"
import { AuthContext } from '../context/AuthContext.jsx'
import { useContext } from 'react'

export const Login = () => {
    let {loginUser} = useContext(AuthContext)
    return (
    <>

    <div className="wrapper fadeInDown">
        <div id="formContent">

            <div className="fadeIn first">
            <img src={UserIcon} id="icon" alt="User Icon" />
            </div>

            <form onSubmit={loginUser}>
            <input type="text" id="username" className="fadeIn second" name="login" placeholder="User" />
            <input type="password" id="password" className="fadeIn third" name="login" placeholder="Password" />
            <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>

        </div>
    </div>
    
    </>
    )
}
