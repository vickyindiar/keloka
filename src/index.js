import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/sass/reset.scss';
import './styles/sass/index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';



ReactDOM.render(
    <Provider store = {store}>
            <Router>
                <App />
            </Router>
    </Provider>
,
document.getElementById('root'));
serviceWorker.unregister();
