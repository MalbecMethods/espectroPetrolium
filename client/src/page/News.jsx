import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav.jsx';
import '../../public/css/news.css';
import Fondo from '../components/Fondo.jsx'

export const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('../../public/data/news.json'); // Cambia la ruta al archivo JSON según donde lo tengas ubicado
        if (Array.isArray(response.data.noticias)) {
          setNoticias(response.data.noticias);
        } else {
          setError('La respuesta del archivo JSON no es un array válido.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Hubo un problema al cargar los datos desde el archivo JSON.');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Fondo />
      <Nav />
      <h1>Noticias de Hidrocarburos</h1>
      <div className="news-container">
        {noticias.map((noticia) => (
          <div key={noticia.titulo} className="news-card">
            <img src={noticia.imagen} alt={noticia.titulo} className="news-image" style={{ width: '100%', borderRadius: '10px' }} />
            <div className="news-details">
              <h2 className="news-title">{noticia.titulo}</h2>
              <p className="news-date">{noticia.fecha}</p>
              <a className="read-more-link" href="/">
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
