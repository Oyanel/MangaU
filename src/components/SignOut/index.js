import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <div onClick={firebase.doSignOut}>
        <i className="fas fa-sign-out-alt"/>
    </div>
);

export default withFirebase(SignOutButton);