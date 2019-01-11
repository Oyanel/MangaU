import React from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';

const Navigation = () => (
    <nav className={'navbar navbar-expand-lg .navbar-fixed-left navbar-light'}>
        <div className={'collapse navbar-collapse'}>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <NavigationAuth/> : <NavigationNonAuth/>
                }
            </AuthUserContext.Consumer>
        </div>
    </nav>
);

const NavigationAuth = () => (
    <ul className='navbar-nav mr-auto'>
        <li className={'nav-item'}>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className={'nav-item'}>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li className={'nav-item'}>
            <SignOutButton/>
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul className='navbar-nav mr-auto'>
        <li className={'nav-item'}>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className={'nav-item'}>
            <Link to={ROUTES.SEARCH}>Search</Link>
        </li>
        <li className={'nav-item'}>
            <Link to={ROUTES.SIGN_IN}><i className="fas fa-sign-in-alt"/></Link>
        </li>
    </ul>
);

export default Navigation;