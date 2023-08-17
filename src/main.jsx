import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import 'react-toastify/dist/ReactToastify.css';

import App from '~/app';
import '~/assets/scss/globals.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.Fragment>
);
