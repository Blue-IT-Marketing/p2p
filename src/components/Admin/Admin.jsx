import React, { Component } from "react";

import "./Admin.css";
import Intro from "../Intro/Intro";
import User from "../User/User";
import Axios from "axios";
import * as app_constants from '../../constants/program_constants';


import Profile from '../Profiles/Profile';
import ProfileLists from '../PublicProfiles/PublicProfiles';
import SignOutButton from "../User/SignOut/SignOut";
import Messages from "../Messages/Messages";
import Wallet from "../Wallet/Wallet";
import {
    firebase, auth
} from '../../firebase'; 
import SignInPage from '../User/SignIn/SignIn';
class Admin extends Component{
    constructor(){
        super();
        this.state = {
            loan_clients : [],
            load_my_profile : false,
            load_public_profiles : false,
            load_friends_profiles : false,
            load_messages : false,
            load_wallet : false,
            load_signout: false,
            load_wallet : false,
            isUserLoggedIn : true,
        }

        this.onShow = this.onShow.bind(this);
    }

    onShow(e){
        
        switch(e.target.name){

            case 'myprofile': this.setState({
                load_my_profile: true,
                load_public_profiles: false,
                load_friends_profiles: false,
                load_messages: false,
                load_wallet: false,
                load_signout: false

            }); break;

            case 'publicprofiles': this.setState({
                load_my_profile: false,
                load_public_profiles: true,
                load_friends_profiles: false,
                load_messages: false,
                load_wallet: false,
                load_signout: false
            });break;

            case 'friendsprofiles': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: true,
                load_messages: false,
                load_wallet: false,
                load_signout: false
            });break;
            case 'messages': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: false,
                load_messages: true,
                load_wallet: false,
                load_signout: false
            }); break;
            case 'wallet': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: false,
                load_messages: false,
                load_wallet: true,
                load_signout: false
            }); break;

            case "signout" : this.setState(
                {
                    load_my_profile: false,
                    load_public_profiles: false,
                    load_friends_profiles: false,
                    load_messages: false,
                    load_wallet: false,
                    load_signout: true
                }
            );break;


            default:break;
        }
    }
    render(){

        let isUserLoggedIn = ((firebase.auth.currentUser !== "") && (firebase.auth.currentUser  !== null ));

        if (isUserLoggedIn){
                return(
                        <div className="admin">
                            <div className="box box-body">
                                <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />
                                <div className="box box-header">
                                    <h3 className="box-title"> Admin </h3>                                     
                                        <button type="button" className="btn btn-warning pull-right" name="signout" onClick={e => this.onShow(e)}><strong>SignOut</strong></button> 
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="box box-primary">
                                            <ol className="list-group">
                                                    <li className="list-group-item"><button className="btn btn-primary btn-block" name="myprofile" onClick={e => this.onShow(e)}> My Profile </button></li>
                                                    <li className="list-group-item"><button className="btn btn-primary btn-block" name="publicprofiles" onClick={e => this.onShow(e)}> Public Profiles </button></li>
                                                    <li className="list-group-item"><button className="btn btn-primary btn-block" name="friendsprofiles" onClick={e => this.onShow(e)}> Friends Profiles </button></li>
                                                    <li className="list-group-item"><button className="btn btn-primary btn-block" name="messages" onClick={e => this.onShow(e)}> Messages </button></li>
                                                    <li className="list-group-item"><button className="btn btn-primary btn-block" name="wallet" onClick={e => this.onShow(e)}> Wallet </button></li>
                                            </ol>
                                        </div>
                                    
                                    </div>
                                    <div className="col-md-6">
                                    {
                                        (this.state.load_my_profile) ? <Profile /> : ""
                                    }
                                    {
                                            (this.state.load_public_profiles) ? <ProfileLists profile_kind="public" /> : ""
                                    }
                                    {
                                            (this.state.load_friends_profiles) ? <ProfileLists profile_kind="friends" /> : ""
                                    }

                                    {
                                        (this.state.load_messages) ? <Messages /> : ""
                                    }

                                    {
                                        (this.state.load_signout) ? <SignOutButton/> : ""
                                    }
                                    {
                                        (this.state.load_wallet) ? <Wallet /> : ""
                                    }
                                    </div>
                                </div>


                            </div>
                        </div>
                    )
            }
            else{
            return (<SignInPage message={"Please sign in before using the administration module"} />)
            }
    }
}



export default Admin;