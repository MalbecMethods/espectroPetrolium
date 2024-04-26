import logo from '../../public/logo_dm.png'
import axios from "axios";

function Header(props) {

function logMeOut() {
    axios({
        method: "POST",
        url:"http://127.0.0.1:5000/logout",
    })
    .then((response) => {
        props.token()
    }).catch((error) => {
    if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;