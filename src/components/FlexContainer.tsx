import { FlexContainerProps } from '@base/types';
import React from 'react';

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  align = 'center',
  justify = 'flex-start',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: align,
    justifyContent: justify,
  };

  return <div style={containerStyles}>{children}</div>;
};

export default FlexContainer;
