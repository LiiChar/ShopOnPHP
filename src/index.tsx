import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/layout/Header';
import { Alert } from './components/layout/Alert';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <Alert/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
