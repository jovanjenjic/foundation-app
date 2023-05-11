import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import FlexContainer from '@base/components/FlexContainer';

const Page404 = ({ goBackTo = '/' }) => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h2" textAlign="center">
        Not Found
      </Typography>
      <FlexContainer justify="center">
        <Button href={goBackTo} variant="contained" size="large">
          Go Back
        </Button>
      </FlexContainer>
    </Container>
  );
};

export default React.memo(Page404);
