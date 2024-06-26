import  Nav  from "../components/Nav.jsx"
import '../../public/css/index.css'
import React, { useState, useEffect, useContext } from 'react'
import {AuthContext} from '../context/AuthContext.jsx';
import imgpetroleo from '../../public/images/imgpetroleo.jpg'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const Index = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    const [pozos, setPozos] = useState([]);
    const [nombrePozo, setNombrePozo] = useState('');
    const [fechaSubida, setFechaSubida] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const nuevoPozo = { nombre: nombrePozo, fecha: fechaSubida };
        setPozos([...pozos, nuevoPozo]);
        setNombrePozo('');
        setFechaSubida('');
    };
    
return(
    <>
    <Nav />
       
       
    <section className="seccionIndex">
        <div className="containerIndex">
            <h1 className="h1Index">Analiza, visualiza y descarga tus datos de hidrocarburos con nuestro software</h1>
            <p className="pIndex">Aprovecha todo el poder de nuestro software para analizar tus datos de manera sensacional y sencilla. Evaluamos tus datos para futuras decisiones en tu empresa, a partir del comportamiento de los datos en el tiempo.</p>

            <button type="button" className="btn btn-light" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Analizar datos</button>

            <div>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-body">
                            <h1 className="h1-index">Datos del pozo</h1>
                            <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Nombre del pozo:</label>
                                <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={nombrePozo}
                                onChange={(e) => setNombrePozo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Fecha de subida:</label>
                                <input
                                type="date"
                                className="form-control"
                                id="recipient-name"
                                value={fechaSubida}
                                onChange={(e) => setFechaSubida(e.target.value)}
                                />
                            </div>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Subir archivo
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <br />
                            <br />
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Enviar datos</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
            <div className="containerIndex2">
            <img src={imgpetroleo} className='img-petroleo'></img>
        </div>
    </section>
    </>
    )
}