import React from 'react';
import { Menu } from "../components/Menu.jsx"
import logo from "../../public/images/logo_dm.png";
import iconuser from "../../public/images/icon-user.png";
import conect from "../../public/images/conect.png";
import "../../public/css/navymenu.css";

export const Nav = ({ usuario }) => {
    return (
        <nav className="navbar">
        <Menu />
            <div className="navbar-logo">
                <img src={logo} alt="Logo de la página" className="logo"/>
            </div>
            <div className="navbar-user">
                <p>Bienvenido de nuevo, {usuario}</p>
                <div className="icon-container">
                    <img src={iconuser} alt="Icono de usuario" className="icon" />
                    <img src={conect} alt="Estado de conexión" className="icon-connect"/>
                </div>
            </div>
        </nav>
    );
};
