import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  

  return (
    <React.Fragment>
      <Title>Ultimo pozo registrado</Title>
      <Typography component="p" variant="h4">
        pozoprueba
      </Typography>
    </React.Fragment>
  );
}