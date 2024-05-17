import logo from "../../public/images/logo_dm.png"
import iconuser from "../../public/images/icon-user.png"
import conect from "../../public/images/conect.png"
import "../../public/css/nav.css"

export const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={ logo } alt="logo" className="navbar-logo"/>
            </div>
                <div className="navbar-user">
                    <p>Bienvenido de nuevo, *usuario*</p>
                
                    <img src={ iconuser } alt="icono usuario" className="icon" />
                    <img src={ conect } alt="conectado" className="icon"></img>
                </div>
        </nav>
    )
}