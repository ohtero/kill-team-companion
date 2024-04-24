import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styling/index.css';
import { GlobalStyles } from './styling/globalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './styling/appTheme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
