import React, { Component } from 'react';
import './Profile.css';
import Axios from 'axios';
import {
    firebase,auth
} from '../../firebase';

export let profile_details = {
    profile_name: "",
    names: "",
    surname: "",
    nickname: "",
    email: "",
    cell: "",
    website: "",
    paypal_email: "",
    introduction: "",
    mystory: "",
    photourl: "",
    userid: "",
}

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            profile_details : profile_details,
            form_response : ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        console.log(e.target.name + " : " + e.target.value);
        let profile_details = Object.assign([],this.state.profile_details);
        
        switch (e.target.name){
            case "profile_name": profile_details.profile_name = e.target.value; break;
            case "names" : profile_details.names = e.target.value;break;
            case "surname": profile_details.surname = e.target.value;break;
            case "nickname" : profile_details.nickname = e.target.value;break;
            case "email" : profile_details.email = e.target.value;break;
            case "cell" : profile_details.cell = e.target.value;break;
            case "website" : profile_details.website = e.target.value;break;
            case "paypal_email" : profile_details.paypal_email = e.target.value;break;
            case "introduction" : profile_details.introduction = e.target.value;break;
            case "mystory" : profile_details.mystory = e.target.value;break;
            case "photourl" : profile_details.photourl = e.target.value; break;
            case "userid" : profile_details.userid = e.target.value;break;
            default: break;
        };

        
        this.setState({
            profile_details: profile_details
        });
    }

    onSubmitHandler(e){

        e.preventDefault();

        let submit_profile_url = '/profiles/save';
        let data = JSON.stringify(this.state.profile_details);
        console.log(data);

        Axios.post(submit_profile_url, "&data=" + data).then(function(response){
            if (response.status === 200){
                return response.data;
            }
        }).then(function(data){
            let form_response = JSON.parse(data);
            this.setState({ form_response: form_response.message})
        }).catch(function(err){
            this.setState({ form_response: err.message })
        });
    }

    componentWillMount(e){
        let userid = firebase.auth.currentUser.uid;
        let userdetails_url = '/profiles/'+userid +"/get";
        Axios.get(userdetails_url).then(function(response){
            if (response.status === 200){
                return response.data;
            }
        }).then(function(data){
            let profile_details = JSON.parse(data);

            if (profile_details.userid === userid){
                console.log("user profile returned");
                this.setState({
                    profile_details: profile_details
                })
            }else{
                console.log("user profile did not  returned");
                let profile_details = Object.assign([],this.state.profile_details);
                profile_details.userid = userid;
                profile_details.names = firebase.auth().currentUser.displayName;
                profile_details.email = firebase.auth().currentUser.email;
                profile_details.photourl = firebase.auth().currentUser.photoURL;
                profile_details.cell = firebase.auth.currentUser.phoneNumber;

                this.setState({
                    profile_details: profile_details
                });
            }

        }).catch(function(response){
            let profile_details = Object.assign([], this.state.profile_details);
            profile_details.userid = userid;
            profile_details.names = firebase.auth.currentUser.displayName;
            profile_details.email = firebase.auth.currentUser.email;
            profile_details.photourl = firebase.auth.currentUser.photoURL;
            profile_details.cell = firebase.auth.currentUser.phoneNumber; 

            this.setState({
                profile_details: profile_details
            });

        })
    }

    render() {
        return (
            <div className="box">
                <div className="box box-header">
                    <h3 className="box-title"> <strong>Profile</strong></h3>
                </div>

                <form className="form-horizontal" onSubmit={e => this.onSubmitHandler(e)}>
                    <div className="form-group">
                        <label>Profile Name</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Profile Name" name="profile_name" value={this.state.profile_details.profile_name} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>

                    <div className="form-group">                                            
                        <label>Names</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Names" name="names" value={this.state.profile_details.names} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Surname</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Surname" name="surname" value={this.state.profile_details.surname} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Nickname</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nickname" name="nickname" value={this.state.profile_details.nickname} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.profile_details.email} onChange={e => this.onChangeHandler(e)} />
                            </div>
                    </div>
                    <div className="form-group">
                        <label>Cell</label>
                        <div className="input-group">
                            <input type="tel" className="form-control" placeholder="Cell" name="cell" value={this.state.profile_details.cell} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>PayPal Email</label>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Email" name="paypal_email" value={this.state.profile_details.paypal_email} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Website</label>
                        <div className="input-group">
                            <input type="url" className="form-control" placeholder="Website" name="website" value={this.state.profile_details.website} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Introduction</label>
                        <div className="input-group">
                            <textarea className="form-control" name="introduction" onChange={e => this.onChangeHandler(e)} value={this.state.profile_details.introduction}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>MyStory</label>
                        <div className="input-group">
                            <textarea className="form-control" name="mystory" onChange={e => this.onChangeHandler(e)} value={this.state.profile_details.mystory}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>PhotoURL</label>
                        <div className="input-group"> 
                            <input type="url" className="form-control" placeholder="Photo URL" name="photourl" value={this.state.profile_details.photourl} onChange={e => this.onChangeHandler(e)} />
                        </div>                                            
                    </div>
                    <div className="form-group">
                        {
                            (this.state.profile_details.photourl) ? <img className="image-responsive" src={this.state.profile_details.photourl} height="200" width="200" ></img>
                                : ""
                        }
                    </div>
                    <div className="form-group">                                        
                        <button type="submit" className="btn btn-primary btn-block" name="submit"><strong> Save Profile </strong></button>
                    </div>
                </form>
        </div>
        )
    }
}

export default Profile;





