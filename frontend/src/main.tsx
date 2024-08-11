import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles } from './globalStyling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './globalStyling/appTheme';
import { MatchDataProvider } from './pages/matchRoom/context/matchContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MatchDataProvider>
        <GlobalStyles />
        <App />
      </MatchDataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
