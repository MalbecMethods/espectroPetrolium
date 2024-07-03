import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav.jsx'

export const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=1c653f892601429b9a755d2fc7043df6');
        setArticles(response.data.articles);
      } catch (error) {
        console.error(`Hubo un error al obtener las noticias: ${error}`);
      }
    };

    getNews();
  }, []);

return (
    <>
    <Nav />
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {articles.map((article, index) => (
        <div key={index} style={{ width: '300px', margin: '20px', border: '1px solid black', borderRadius: '10px', backgroundColor:'white' }}>
          <div style={{ padding: '10px', color:'black'}}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url}>Leer más</a>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

