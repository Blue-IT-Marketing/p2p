import React, { Component } from 'react';
import profile_details from '../Profiles/Profile';
import Axios from 'axios';
import {
    firebase, auth
} from '../../firebase';


const ProfileListItem = props => {
    return (
        <tr>
            <td>{props.profile_name}</td>
            <td>{props.nickname}</td>
            <td>{props.introduction}</td>
            <td>{props.photourl}</td>
        </tr>
    )
}

class ProfileLists extends Component{
    constructor(props){
        super(props);
        this.state = {            
            owner_profile : {...profile_details},
            selected_profile: { ...profile_details },
            profiles_list : [],
            profile_kind: "",

        }
    }

    loadOwnerProfile(e){
        let userid = firebase.auth.currentUser.uid;
        let owner_profile_url = '/profiles/' + userid + "/get"
        let owner_profile = "";
        console.log(userid);
        Axios.get(owner_profile_url).then(function(response){
            if (response.status === 200){
                return response.data
            }else{
                throw new Error("Error fetching owner Profile");
            }
        }).then(function(data){
            owner_profile = JSON.parse(data);

        }).catch(function(err){
            owner_profile = "";
        });

        if (owner_profile !== ""){
            this.setState({
                owner_profile:owner_profile
            })
        }else{
            let owner_profile = Object.assign([],this.state.owner_profile);
            owner_profile.userid = userid;
            owner_profile.names = firebase.auth.currentUser.displayName;
            owner_profile.email = firebase.auth.currentUser.email;
            owner_profile.cell = firebase.auth.currentUser.phoneNumber;
            owner_profile.photourl = firebase.auth.currentUser.photoURL;

            this.setState({
                owner_profile:owner_profile
            })

        }
        
    }

    componentWillMount(e){

        this.loadOwnerProfile(e);

        this.setState({
            owner_profile : this.props.owner_profile
        })

        if (this.props.profile_kind === "public"){

            let load_url = '/profiles/public';
            let response = ""
            let isError = false;
            Axios.get(load_url).then(function(response){
                if (response.status === 200){
                    return response.data;
                }else{
                    throw new Error("error fetching public profiles");
                }
            }).then(function(data){
                response = JSON.parse(data);                
            }).catch(function(err){
                isError = true;
                response = "";
            });
            if (response !== ""){
                this.setState({
                    profiles_list: response,
                    profile_kind: this.props.profile_kind
                })
            }else{
                this.setState({
                    profiles_list: [],
                    profile_kind: ""
                })

            }

        };

        if (this.props.profile_kind === "friends") {

            let userid = firebase.auth.currentUser.uid;
            let load_url = '/profiles/friends/' + userid;
            let response = ""
            let isError = false;
            Axios.get(load_url).then(function (response) {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error("error fetching friends profiles");
                }
            }).then(function (data) {
                response = JSON.parse(data);
            }).catch(function (err) {
                isError = true;
                response = "";
            });
            if (response !== "") {
                this.setState({
                    profiles_list: response,
                    profile_kind: this.props.profile_kind
                })
            } else {
                this.setState({
                    profiles_list: [],
                    profile_kind: ""
                })

            }

        }
    }


    render(){
        // let title;
        let title = (this.props.profile_kind === "public" ? "Public Profiles" : "Friends Profiles");
        
        
        return(
            <div className="box">
                <div className="box box-header">
                    <h3 className="box-title">{title}</h3>
                </div>
                <table className="table table-responsive table-bordered table-striped">
                    <thead>
                        <tr>
                            <td><strong>Profile Name</strong></td>
                            <td><strong>Nickname</strong></td>
                            <td><strong>Introduction</strong></td>
                            <td><strong>Image</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.profiles_list.map((profile,index) => {
                                return (
                                    <ProfileListItem
                                    key={profile.userid}
                                    profile_name={profile.profile_name}
                                    nickname={profile.nickname}
                                    introduction={profile.introduction}
                                    photourl={profile.photourl}
                                    />
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Profile Name</strong></td>
                            <td><strong>Nickname</strong></td>
                            <td><strong>Introduction</strong></td>
                            <td><strong>Image</strong></td>
                        </tr>                        
                    </tfoot>
                </table>
            </div>

        )
    }
}


export default ProfileLists;