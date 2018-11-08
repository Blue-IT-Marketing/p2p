import React, { Component } from 'react';
import './signin.css';

import Intro from '../../Intro/Intro';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../Signup/Signup';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';


const SignInPage = (props) => {

    return (

        <div className="sign-in">

            <Intro />

            <div className="row">
                <div className="col-lg-3">

                <div className="box box-primary">
                    <div className="box box-header">
                        <h3 className="box-title"> Login </h3>                        
                    </div>
                </div>


                </div>

                <div className="col-lg-9">
                    <div className="box box-body">
                        <SignInForm history={props.history} />
                        <SignUpLink />            
                    </div>    
                
                </div>
            </div>

        </div>
    )
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const Initial_State = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Initial_State };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...Initial_State });
                history.push(routes.home);
                
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="col-lg-6">
            <form className="form-horizontal" onSubmit={this.onSubmit}>

                <div className="form-group">
                    <input className="form-control"
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                </div>

                <div className="form-group">
                    <input className="form-control"
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
                            <strong>Sign In</strong>
                    </button>
                </div>

                {error && <p>{error.message}</p>}
            </form>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};