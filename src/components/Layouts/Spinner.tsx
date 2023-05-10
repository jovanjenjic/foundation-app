import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

const Spinner = () => {
  return (
    <Container maxWidth="xs">
      <CircularProgress
        style={{
          display: 'flex',
          margin: '0 auto',
        }}
      />
    </Container>
  );
};

export default Spinner;
