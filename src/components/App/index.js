import React from 'react';
import {compose} from 'recompose';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';
import {withMangaApi} from "../MangaApi";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className={'application'}>
                    <Navigation/>
                    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                </div>
            </Router>
        );
    }
}

export default compose(withAuthentication, withMangaApi)(App);
