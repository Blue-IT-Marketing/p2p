import React, { Component } from 'react';
import './Profile.css';
import Axios from 'axios';
import {
    firebase,auth
} from '../../firebase';
import SignInPage from '../User/SignIn/SignIn';
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
            profile_details : {...profile_details},
            form_response : ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        console.log(e.target.name + " : " + e.target.value);
        let profile_details = Object.assign({},this.state.profile_details);
        
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
            profile_details:profile_details
        });
    }

    onSubmitHandler(e){

        e.preventDefault();

        let submit_profile_url = '/profiles/save';
        let data = JSON.stringify(this.state.profile_details);
        console.log(data);

        let message = "";

        Axios.post(submit_profile_url, "&data=" + data).then(function(response){
            if (response.status === 200){
                return response.data;
            }
        }).then(function(data){
            let form_response = JSON.parse(data);
            message = form_response.message;
        }).catch(function(err){
            message = err.message;
            
        });

        this.setState({ form_response: message })
    }

    componentWillMount(e){
        let userid = firebase.auth.currentUser.uid;
        console.log("User ID " + userid);
        let userdetails_url = '/profiles/'+userid +"/get";
        let profile_details = Object.assign({}, this.state.profile_details);
        let isError = false;
        let errMessage = "";

        if (userid !== ""){
            profile_details.userid = userid;            
            profile_details.names = firebase.auth.currentUser.displayName;
            console.log(profile_details.names)
            profile_details.email = firebase.auth.currentUser.email;
            profile_details.photourl = firebase.auth.currentUser.photoURL;
            profile_details.cell = firebase.auth.currentUser.phoneNumber;
            console.log(profile_details.cell);

            
            Axios.get(userdetails_url).then(function(response){
                if (response.status === 200){
                    return response.data;
                }else{
                    throw new Error("Error fetching owner profile")
                }
            }).then(function(data){
                profile_details = JSON.parse(data);

                if (profile_details.userid === userid){
                    console.log("user profile returned");
                    
                }else{
                    console.log("user profile did not  returned");
                    throw new Error("user profile did not  returned");
                }

            }).catch(function(err){
                console.log(err.message);
                errMessage = err.message;
                isError = true;
                
            });

            if (!isError){
                this.setState({
                    profile_details: profile_details,
                    errMessage: "profile loaded successfully"
                });
            }else{
                this.setState({ 
                    form_response: errMessage,
                    profile_details: profile_details
                 })
            }

            console.log("State changed to > " + this.state.profile_details)
        }else{
            //create a means of telling the app to not load component
        }

    }

    shouldComponentUpdate(prevState){
        return true;
    }

    render() {

        let isUserLoggedIn = ((firebase.auth.currentUser !== "") && (firebase.auth.currentUser !== null));

        if (isUserLoggedIn) { 
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

                            <div className="form-group">
                            <p>{
                                    this.state.form_response
                                }</p>                     
                            </div>
                        </form>
                </div>
            )
            }else{
                    return (<SignInPage message={"Please sign in before using the profile module"} />)
            }
    }
}

export default Profile;





