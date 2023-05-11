import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FlexContainer from '../FlexContainer';

const Spinner: React.FC = () => {
  return (
    <FlexContainer align="center" justify="center">
      <CircularProgress />
    </FlexContainer>
  );
};

export default Spinner;
