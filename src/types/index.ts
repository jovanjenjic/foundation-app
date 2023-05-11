import { ReactNode } from 'react';

export interface FlexContainerProps {
  children: ReactNode;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
}
