import React, { Component } from 'react';
import './signin.css';

import Intro from '../../Intro/Intro';
import { withRouter } from 'react-router-dom';

import {  SignUpForm  } from '../Signup/Signup';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';
import * as app_constants from '../../../constants/program_constants';


class SignInPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showsignIn : true,
            signupText : 'SignUp',
            

        }

        this.showSignUp = this.showSignUp.bind(this);
        
    }

    showSignUp(e){

        let prevState = this.state.showsignIn;
        switch(prevState){
            case true : this.setState({
                showsignIn: !prevState,
                signupText: 'SignIn',
                
            });break;
            case false: this.setState({
                showsignIn: !prevState,
                signupText: 'SignUp',
                
            });break;
            default: break;
        }
        
    }

    returnStyles(styles){
        let all_styles = "";
        styles.forEach((style) => {
            if (all_styles === ""){
                all_styles = style;
            }else{
                all_styles += " " + style;
            }
        });
        return all_styles;
    }


    render(){

    

    return (

        <div className="sign-in">

            <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />

            <div className="row">
                <div className="col-lg-3">

                <div className="box box-primary">
                    <div className="box box-header">
                        <h3 className="box-title"> Login </h3>                        
                    </div>
                </div>
                    <button className="btn btn-info btn-block" onClick={e => this.showSignUp(e)}> <strong>{this.state.signupText}</strong></button>                    
                </div>
                <div className="col-lg-9">
                    <div className="box box-body">
                    {
                        (this.state.showsignIn) ?
                            <div>
                            <SignInForm history={this.props.history} message={this.props.message} />
                            
                            </div>
                            : <SignUpForm />

                    }
                    </div>    
                
                </div>
            </div>

        </div>
    )}
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

            <div className="box box-header">
                    <h3 className="box-title"><strong>SignIn</strong></h3>
                    <hr/>
                    <h4 className="box-title">{this.props.message}</h4>

            </div>
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
                    <button disabled={isInvalid} type="submit" className="btn btn-success btn-block">
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