import React, { Component } from "react";
import "./Admin.css";
import Intro from "../Intro/Intro";
import User from "../User/User";
import Axios from "axios";
import * as app_constants from '../../constants/program_constants';


import Profile from '../Profiles/Profile';
import ProfileLists from '../PublicProfiles/PublicProfiles';

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

            }); break;

            case 'publicprofiles': this.setState({
                load_my_profile: false,
                load_public_profiles: true,
                load_friends_profiles: false,
                load_messages: false,
                load_wallet: false,
            });break;

            case 'friendsprofiles': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: true,
                load_messages: false,
                load_wallet: false,
            });break;
            case 'messages': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: false,
                load_messages: true,
                load_wallet: false,
            }); break;
            case 'wallet': this.setState({
                load_my_profile: false,
                load_public_profiles: false,
                load_friends_profiles: false,
                load_messages: false,
                load_wallet: true,
            }); break;


            default:break;
        }


    }


    render(){
        return(
        <div className="admin">
            <div className="box box-body">
                <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />

                <div className="box box-header">
                    <h3 className="box-title"> Admin </h3>
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
                    </div>
                </div>


            </div>
        </div>
        )
    }
}



export default Admin;