import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './User.css';
class User extends Component {
    constructor (){
        super();
        this.state = {
            profile_name : "",
            names : "",
            email : "",
            photourl: "",
            userid : "",
            isLoggedIn : false,
        }
    }

    onChange(e){
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="user">
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <strong>Profile</strong></h3>
                </div>
            <Tabs>
                <TabList>
                    <Tab><h3> <small>User Details</small></h3></Tab>
                    <Tab><h3> <small>Settings</small></h3></Tab>
                </TabList>
                <TabPanel>
                    <div className="box box-info">
                        <div className="box box-header">
                            <h3 className="box-title"> <small>User Details</small></h3>
                        </div>
                        <div className="col-md-6">

                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="input-group"> <i className="fa fa-user"> </i> </div>
                                <input type="text" className="form-control" placeholder="Names" name="names" value={this.state.names} onChange={ e => this.onChange(e)} />
                                
                            </div>
                            <div className="form-group">
                                <div className="input-group"> </div>
                                <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <div className="input-group"> </div>
                                <input type="text" className="form-control" placeholder="Photo URL" name="photourl" value={this.state.photourl} onChange={e => this.onChange(e)} />
                            </div>

                            <div className="form-group">
                                <button type="button" className="btn btn-primary btn-block" name="submit"><strong> Submit </strong></button> 
                            </div>


                        </form>
                        </div>
                        <div className="col-md-6">

                        </div>


                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="box box-info">
                        <div className="box box-header">
                                    <h3 className="box-title"> <small>User Settings</small></h3>
                        </div>
                    
                    </div>

                </TabPanel>

            </Tabs>
            </div>
            </div>
        )
    }

}


export default User;





