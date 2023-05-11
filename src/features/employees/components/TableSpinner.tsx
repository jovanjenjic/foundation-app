import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const TableSpinner: React.FC = () => {
  const style: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: 'rgba(192, 192, 192, 0.3)',
  };
  return (
    <div style={style}>
      <CircularProgress />
    </div>
  );
};

export default TableSpinner;
