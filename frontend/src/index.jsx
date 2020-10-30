import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import  store  from './Store';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>

,document.getElementById('root'));



