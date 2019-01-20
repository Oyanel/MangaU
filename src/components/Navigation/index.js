import React from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';

const Navigation = () => (
    <nav className={'navbar navbar-expand-lg'}>
        <div className={'collapse navbar-collapse justify-content-end'}>
            <Link to={ROUTES.LANDING}>
                <div className={'landing'}/>
            </Link>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <NavigationAuth/> : <NavigationNonAuth/>
                }
            </AuthUserContext.Consumer>
        </div>
    </nav>
);

const NavigationAuth = () => (
    <div className="btn-group justify-content-end">
        <button className="account btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">me
        </button>
        <div className="dropdown-menu dropdown-menu-right menu-account">
            <SignOutButton/>
            <button className="dropdown-item" type="button">
                <Link to={ROUTES.ACCOUNT}>Mon compte</Link>
            </button>

        </div>
    </div>
);

const NavigationNonAuth = () => (
    <div className={'btn-signin'}>
        <Link to={ROUTES.SIGN_IN}><i className="fas fa-sign-in-alt"/></Link>
    </div>
);

export default Navigation;