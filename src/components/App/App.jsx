import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Toolbar from "../toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../Backdrop/Backdrop";


import About from "../About/About";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";

import Chat from "../Chat/Chat";

//routes
import * as routes from "../../constants/routes";

import * as client_routes from '../../constants/clients-routes';
import * as app_constants from '../../constants/program_constants';
// loan modules

import Clients from '../Clients/Clients';

import SignInPage from "../User/SignIn/SignIn";
import SignUpPage from "../User/Signup/Signup";
import SignOutButton from "../User/SignOut/SignOut";


import withAuthentication from '../withAuthentication/withAuthentication';
import User from '../User/User';
import Admin from '../Admin/Admin';


class App extends Component {
  constructor (){
    super();
    this.state = {
      sidedrawerOpen: false      
    }
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
       return {sidedrawerOpen: !prevState.sidedrawerOpen }
    });
  };


  BackDropClickHandler = () => {
    this.setState({ sidedrawerOpen: false });
  };


  componentWillMount(e){
    document.title = app_constants.app_name + ' | ' + app_constants.app_long_name;
    
  }

  render() {
    let backdrop_show;
    if (this.state.sidedrawerOpen) {
      backdrop_show = <BackDrop click={this.BackDropClickHandler}  />;
    };

    return (
      <div>
      <Router>                   
          <div>
            <Toolbar drawerClickHandler={this.drawerToggleHandler} />  
            <SideDrawer show={this.state.sidedrawerOpen} />            
            {backdrop_show}

            <div>
              <Route exact path={routes.landing} component={Home}/>
              <Route exact path={routes.home} component={Home} />
              <Route path={routes.about} component={About} />

              <Route exact path={routes.contact} component={Contact} />

              <Route path={client_routes.clients} component={Clients}/>
              
              <Route path={routes.chat} component={Chat} />
              <Route exact path={routes.account} component={User} />
              <Route exact path={routes.admin} component={Admin} />


              <Route exact path={routes.signin} component={SignInPage} />
              <Route exact path={routes.signup} component={SignUpPage} />
              <Route exact path={routes.signout} component={SignOutButton} />

            </div>
          </div>            
      </Router>
      </div>
    );
  }
}

export default  withAuthentication(App);
