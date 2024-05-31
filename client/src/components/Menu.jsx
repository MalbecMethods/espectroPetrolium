import React, { useState } from 'react';
import '../../public/css/navymenu.css';

export const Menu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible); // Esto alternará la visibilidad del menú
    };
  
    return (
      <div className="menu-container">
        {/* El botón siempre está visible y puede mostrar u ocultar el menú */}
        <button onClick={toggleMenu} className="menu-button">☰</button>
        <div className={`menu-hamburguesa ${menuVisible ? 'active' : ''}`}>
          <a href="#seccion1">1</a>
          <a href="#seccion2">2</a>
          <a href="#seccion1">1</a>
          <a href="#seccion2">2</a>
          <a href="#seccion1">1</a>
          <a href="#seccion2">2</a>
          <a href=""></a>
        </div>
      </div>
    );
  }
  