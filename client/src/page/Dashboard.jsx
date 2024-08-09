import Nav from '../components/Nav.jsx'
import '../../public/css/dashboard.css'
import React, { useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import Title from './dashboard/Title';
import Orders from './dashboard/Orders.jsx';
import Fondo from '../components/Fondo.jsx'

export const Dashboard = () => {
    const theme = useTheme();

    const [datos, setDatos] = React.useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/datasets/api/')
            .then(response => {
                setDatos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const barSeries = datos.length > 0 ? [
        { id: '1', data: datos.map(item => item.temperature) }
    ] : [
        { id: '1', data: [] }
    ];

    const scatterSeries = datos.length > 0 ? [
        {
            label: 'Presión vs Profundidad',
            data: datos.map(item => ({ x: item.depth, y: item.pressure, id: item.id }))
        }
    ] : [
        { label: 'Presión vs Profundidad', data: [] }
    ];

    return (
        <>
            <Fondo />
            <Nav />
            

            <div className="divPrincipal">
                <div className="div1" >
                <Orders />
                </div>
                <div className="div2">
                <Title>Temperatura en función de la Profundidad</Title>
                    {datos.length > 0 ? (
                        <BarChart
                            dataset={datos}
                            series={barSeries}
                            height={290}
                            xAxis={[{ dataKey: 'depth', scaleType: 'band' }]}
                            yAxis={[
                                {
                                    label: 'temperature',
                                    labelStyle: {
                                        ...theme.typography.body1,
                                        fill: theme.palette.text.primary,
                                    }
                                }
                            ]}
                        />
                    ) : (
                        <p>Cargando datos...</p>
                )}

                <Title>Presión en función de la Profundidad</Title>
                    {datos.length > 0 ? (
                        <ScatterChart
                            width={600}
                            height={300}
                            series={scatterSeries}
                        />
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </div>
            </div>
        </>
    );
};

