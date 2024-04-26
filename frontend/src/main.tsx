import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyles } from './globalStyling/globalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './globalStyling/appTheme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
