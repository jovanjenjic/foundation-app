import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const Page404 = ({ goBackTo = '/' }) => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h2" textAlign="center">
        Not Found
      </Typography>
      <Button
        style={{ display: 'flex' }}
        href={goBackTo}
        variant="contained"
        size="large"
      >
        Go Back
      </Button>
    </Container>
  );
};

export default React.memo(Page404);
