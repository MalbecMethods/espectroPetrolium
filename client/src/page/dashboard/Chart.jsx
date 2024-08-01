import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './Title.jsx';

import axios from 'axios';

import { useEffect } from 'react';


// Generate information of temperature and depth
 function createData(temperature, depth) {
   return { temperature, depth: depth ?? null };
 }

export default function Chart() {
  const theme = useTheme();

  const [datos, setDatos] = React.useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/datasets/api/')
      .then((response) => {
        setDatos(response.data.map((item) => createData(Math.round(item.temperature), item.depth)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Temperatura en funcion de la Profundidad</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={datos}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'depth',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'temperature',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 200,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'temperature',
              showMark: true,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}