import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div className={'signin'}>
        <div className="background"/>
        <div className="login-form col-xl-3 col-lg-6 col-md-8">
            <h2>Connectez-vous</h2>
            <p>Veuillez entrer votre email et mot de passe</p>
            <SignInForm/>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">

                    <input
                        id={'inputEmail'}
                        className={'form-control'}
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">

                    <input
                        id={'inputPassword'}
                        className={'form-control'}
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Mot de passe"
                    />
                </div>
                <button
                    className={'btn btn-primary'}
                    disabled={isInvalid} type="submit">
                    Se connecter
                </button>

                {error && <p className={'error'}>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm};