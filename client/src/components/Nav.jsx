import logo from "../../public/images/logo_dm.png"
import iconuser from "../../public/images/icon-user.png"
import conect from "../../public/images/conect.png"

export const Nav = () => {
    return (
        <header>
            <img src={ logo } alt="logo" />

            <div>
                <p>Bienvenido de nuevo, *usuario*</p>
            </div>
            <div>
                <img src={ iconuser } alt="icono usuario" />
                <img src={ conect } alt="conectado"></img>
            </div>
        </header>
    )
}