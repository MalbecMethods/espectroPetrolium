import { Nav } from "../components/Nav.jsx"
import "../../public/css/login.css"
import UserIcon from "../../public/images/icon-user.png"

export const Login = () => {
    return (
    <>

    <Nav />
    <div class="wrapper fadeInDown">
        <div id="formContent">

            <div class="fadeIn first">
            <img src={UserIcon} id="icon" alt="User Icon" />
            </div>

            <form>
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="User" />
            <input type="text" id="password" class="fadeIn third" name="login" placeholder="Password" />
            <input type="submit" class="fadeIn fourth" value="Log In" />
            </form>

        </div>
    </div>
    
    </>
    )
}
