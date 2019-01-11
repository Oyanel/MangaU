import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/bootstrap/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, {FirebaseContext} from './components/Firebase';
import MangaApi, {MangaApiContext} from './components/MangaApi';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <MangaApiContext.Provider value={new MangaApi()}>
            <App/>
        </MangaApiContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();