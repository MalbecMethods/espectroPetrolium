import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useEffect } from 'react';


// Generate Order Data

function createData(id, fecha_registro, time , pressure, temperature, depth, pozo) {
  return { id, fecha_registro, time, pressure, temperature, depth, pozo };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [rows, setRows] = React.useState([]);
  


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/datasets/api/')
      .then((response) => {
        setRows(response.data.map((item) => createData(item.id, item.fecha_registro, item.time, item.pressure, item.temperature, item.depth, item.pozo)));
      })
      .catch((error) => {
        console.log(error);
      });;
  }, []);
  return (
    <React.Fragment>
      <Title>Registros Recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Fecha del registro</TableCell>
            <TableCell>Tiempo</TableCell>
            <TableCell>Presion</TableCell>
            <TableCell>Temperatura</TableCell>
            <TableCell>Profundidad</TableCell>
            <TableCell>Pozo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.fecha_registro}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.pressure}</TableCell>
              <TableCell>{row.temperature}</TableCell>
              <TableCell>{row.depth}</TableCell>
              <TableCell>{row.pozo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}