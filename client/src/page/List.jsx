import  Nav  from "../components/Nav.jsx"
import '../../public/css/index.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const List = () => {
  const [pozos, setPozos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/');
        if (Array.isArray(response.data)) {
          setPozos(response.data);
        } else {
          setError('La respuesta de la API no es un array.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Hubo un problema al cargar los datos.');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Nav />
      <h1>Mis pozos</h1>
      <ul>
        {pozos.map((pozo) => (
          <li key={pozo.id}>
            <strong>{pozo.pozo}</strong>
            <p>Tiempo: {pozo.time}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
