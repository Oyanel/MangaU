import React from 'react';

import {withFirebase} from '../Firebase';

const SignOutButton = ({firebase}) => (
    <button className="dropdown-item" onClick={firebase.doSignOut} type="button">
        <i className="fas fa-sign-out-alt"/>
    </button>
);

export default withFirebase(SignOutButton);