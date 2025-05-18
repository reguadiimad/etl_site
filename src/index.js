import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux(toolKit)/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import AppAdmin from './AppAdmin';

serviceWorkerRegistration.register();

const path = window.location.pathname;
const isAdmin = path.startsWith('/adminETL');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      {isAdmin ? <AppAdmin/> : <App/>}
    </Provider>

);

reportWebVitals();
