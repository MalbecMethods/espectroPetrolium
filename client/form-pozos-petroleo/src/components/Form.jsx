// src/components/Form.jsx
import React, { useState } from 'react';
import './form.css';

export const Form = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !date) {
      alert('Por favor, complete todos los campos');
      return;
    }
    console.log('Archivo:', file);
    console.log('Fecha:', date);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="file">Archivo de datos:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label htmlFor="date">Fecha de obtención de datos:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};
