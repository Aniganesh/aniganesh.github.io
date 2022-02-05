import React, {FC} from 'react';
import './index.css';
import {ThemeProvider} from '@material-ui/core';
import Theme from './Theme';
import RootLayout from './RootLayout';

const App: FC = ()=> {
  return (
    <ThemeProvider theme={Theme}>
      <RootLayout />
    </ThemeProvider>
  );
};

export default App;
