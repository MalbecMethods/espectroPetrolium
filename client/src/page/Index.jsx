import Nav from "../components/Nav.jsx";
import '../../public/css/index.css';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import imgpetroleo from '../../public/images/imgpetroleo.jpg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import Swal from 'sweetalert2';
import Fondo from '../components/Fondo.jsx'


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
    let [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        });
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            setProfile(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        }
    };

    const [pozos, setPozos] = useState([]);
    const [nombrePozo, setNombrePozo] = useState('');
    const [fechaSubida, setFechaSubida] = useState('');
    const [file, setFile] = useState(null);
    const [time, setTime] = useState('');
    const [pressure, setPressure] = useState('');
    const [temperature, setTemperature] = useState('');
    const [depth, setDepth] = useState('');



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nombre', nombrePozo);  // Añadir nombre al FormData
        formData.append('fecha', fechaSubida);  // Añadir fecha al FormData

        try {
            const response = await axios.post('http://localhost:8000/datasets/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            const nuevoPozo = { nombre: nombrePozo, fecha: fechaSubida };
            setPozos([...pozos, nuevoPozo]);
            setNombrePozo('');
            setFechaSubida('');

            Swal.fire({
                title: 'Éxito!',
                text: 'El archivo se subió correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error subiendo el archivo:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al subir el archivo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSubmitManual = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombrePozo);  // Añadir nombre al FormData
        formData.append('fecha', fechaSubida);  // Añadir fecha al FormData
        formData.append('time', time);
        formData.append('pressure', pressure);
        formData.append('temperature', temperature);
        formData.append('depth', depth);



        try {
            const response = await axios.post('http://localhost:8000/datasets/senddata/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            const nuevoPozo = { nombre: nombrePozo, fecha: fechaSubida };
            setPozos([...pozos, nuevoPozo]);
            setNombrePozo('');
            setFechaSubida('');
            setTime('');
            setPressure('');
            setTemperature('');
            setDepth('');

            Swal.fire({
                title: 'Éxito!',
                text: 'Se registraron los datos correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error subiendo datos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al registrar los datos.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }



    return (
        <>
            <Fondo />
            <Nav />
            <section className="seccionIndex">
                <div className="containerIndex">
                    <h1 className="h1Index">Analiza, visualiza y descarga tus datos de hidrocarburos con nuestro software</h1>
                    <p className="pIndex">Aprovecha todo el poder de nuestro software para analizar tus datos de manera sensacional y sencilla. Evaluamos tus datos para futuras decisiones en tu empresa, a partir del comportamiento de los datos en el tiempo.</p>
                    <button type="button" className="btn btn-light" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Analizar datos</button>

                    <div>
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <h1 className="h1-index">Datos del pozo</h1>
                                        <form onSubmit={handleSubmit}>
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
                                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                            </Button>

                                            <br />
                                            <br />

                                            <button type="button" className="btn-link"  data-toggle="modal" data-target="#formularioManual" data-whatever="@fat">Prefieres subir un registro manualmente?</button>
                                            <br />
                                            <br />
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Enviar datos</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="modal fade" id="formularioManual" tabindex="-1" role="dialog" aria-labelledby="formularioManualLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <h1 className="h1-index">Registro de datos</h1>
                                        <form onSubmit={handleSubmitManual}>
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
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Tiempo:</label>
                                                <br/>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="recipient-name"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Presion:</label>
                                                <br/>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="recipient-name"
                                                    value={pressure}
                                                    onChange={(e) => setPressure(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Temperatura:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="recipient-name"
                                                    value={temperature}
                                                    onChange={(e) => setTemperature(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Profundidad:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="recipient-name"
                                                    value={depth}
                                                    onChange={(e) => setDepth(e.target.value)}
                                                />
                                            </div>
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
                    <img src={imgpetroleo} className='img-petroleo' alt="Petroleo" />
                </div>
            </section>
        </>
    );
};
