import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import theme from './styles/theme';
import './styles/global.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <App />
        </Router>
      </I18nextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
