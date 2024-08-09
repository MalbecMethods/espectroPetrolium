import Nav from "../components/Nav.jsx";
import '../../public/css/index.css';
import '../../public/css/list.css';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Fondo from '../components/Fondo.jsx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const List = () => {
  function createData(id, fecha_registro, time, pressure, temperature, depth, pozo) {
    return { id, fecha_registro, time, pressure, temperature, depth, pozo };
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  const [rows, setRows] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [editMode, setEditMode] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/datasets/api/')
      .then((response) => {
        const data = response.data.map((item) => createData(item.id, item.fecha_registro, item.time, item.pressure, item.temperature, item.depth, item.pozo));

        // Agrupando los datos por pozo
        const grouped = data.reduce((acc, curr) => {
          if (!acc[curr.pozo]) {
            acc[curr.pozo] = [];
          }
          acc[curr.pozo].push(curr);
          return acc;
        }, {});

        setGroupedData(grouped);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditClick = (pozo, id) => {
    setEditMode((prev) => ({ ...prev, [`${pozo}-${id}`]: true }));
    setUpdatedData((prev) => ({ ...prev, [`${pozo}-${id}`]: groupedData[pozo].find((row) => row.id === id) }));
  };

  const handleInputChange = (pozo, id, field, value) => {
    setUpdatedData((prev) => ({
      ...prev,
      [`${pozo}-${id}`]: {
        ...prev[`${pozo}-${id}`],
        [field]: value,
      },
    }));
  };

  const handleSaveClick = (pozo, id) => {
    const updatedRow = updatedData[`${pozo}-${id}`];
    axios.put(`http://127.0.0.1:8000/datasets/api/${id}/`, updatedRow)
      .then(() => {
        setGroupedData((prev) => ({
          ...prev,
          [pozo]: prev[pozo].map((row) => (row.id === id ? updatedRow : row)),
        }));
        setEditMode((prev) => ({ ...prev, [`${pozo}-${id}`]: false }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Fondo />
      <Nav />
      <h1>Lista de pozos</h1>
      <div className="listContainer">
        {Object.keys(groupedData).map((pozo) => (
          <Accordion key={pozo}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${pozo}-content`}
              id={`panel-${pozo}-header`}
            >
              <Typography>{pozo}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Fecha del registro</TableCell>
                    <TableCell>Tiempo</TableCell>
                    <TableCell>Presión</TableCell>
                    <TableCell>Temperatura</TableCell>
                    <TableCell>Profundidad</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedData[pozo].map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <TextField
                            size="small"
                            value={updatedData[`${pozo}-${row.id}`].fecha_registro}
                            onChange={(e) => handleInputChange(pozo, row.id, 'fecha_registro', e.target.value)}
                          />
                        ) : (
                          row.fecha_registro
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <TextField
                            size="small"
                            value={updatedData[`${pozo}-${row.id}`].time}
                            onChange={(e) => handleInputChange(pozo, row.id, 'time', e.target.value)}
                          />
                        ) : (
                          row.time
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <TextField
                            size="small"
                            value={updatedData[`${pozo}-${row.id}`].pressure}
                            onChange={(e) => handleInputChange(pozo, row.id, 'pressure', e.target.value)}
                          />
                        ) : (
                          row.pressure
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <TextField
                            size="small"
                            value={updatedData[`${pozo}-${row.id}`].temperature}
                            onChange={(e) => handleInputChange(pozo, row.id, 'temperature', e.target.value)}
                          />
                        ) : (
                          row.temperature
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <TextField
                            size="small"
                            value={updatedData[`${pozo}-${row.id}`].depth}
                            onChange={(e) => handleInputChange(pozo, row.id, 'depth', e.target.value)}
                          />
                        ) : (
                          row.depth
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[`${pozo}-${row.id}`] ? (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleSaveClick(pozo, row.id)}
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setEditMode((prev) => ({ ...prev, [`${pozo}-${row.id}`]: false }))}
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEditClick(pozo, row.id)}
                          >
                            Editar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
