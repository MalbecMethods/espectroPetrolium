import React, { useEffect } from 'react';
import Nav from '../components/Nav'; // Asegúrate de importar tu componente Nav
import Leaflet from '../components/Leaflet';
import Fondo from '../components/Fondo.jsx'

export const Maps = () => {
    

    return (
        <>  
            <Fondo />
            <Nav />
            <h1>Ubicación de Yacimientos</h1>
            <Leaflet />
        </>
    );
};
