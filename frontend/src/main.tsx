import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyles } from './globalStyling/globalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './globalStyling/appTheme.ts';
import { MatchDataProvider } from './pages/matchRoom/context/matchContext.tsx';

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
