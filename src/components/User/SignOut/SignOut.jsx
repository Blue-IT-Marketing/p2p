import React from 'react';
import Intro from '../../Intro/Intro';
import { auth } from '../../../firebase';
import './SignOut.css';

const SignOutButton = () =>
{
    return (
        <div className="signout">
        <Intro />

            <div className="row">
                <div className="col-lg-3">
                
                </div>

                <div className="col-lg-9">
                    <div className="box box-primary">
                        <div className="box box-header">
                            <h3 className="box-title"> Sign Out</h3>

                        </div>
                    </div>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="button" onClick={auth.doSignOut}>                    
                                Sign Out
                            </button>
                        </div>   
                    </form>
                </div>

            </div>   

        </div>

    );

};

export default SignOutButton;