import { FlexContainerProps } from '@base/types';
import React from 'react';

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  align = 'center',
  justify = 'center',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: align,
    justifyContent: justify,
  };

  // Wrapper around the component that will position the children
  return <div style={containerStyles}>{children}</div>;
};

export default FlexContainer;
