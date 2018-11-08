
import React from "react";
import {Link} from "react-router-dom";
import "./MenuItems.css";
import * as routes from '../../constants/routes';
import * as client_routes from '../../constants/clients-routes';
import AuthUserContext from '../withAuthentication/AuthUserContext';
const AuthItems = (props) => {
    return (
    <div>
        <ul>
            <li><Link to={routes.landing}><strong> Home </strong></Link></li>
            <li><Link to={routes.about}><strong>About</strong></Link></li>
            <li><Link to={routes.contact}><strong>Contact</strong></Link></li>            
            <li><Link to={routes.chat}><strong>Chat</strong></Link></li>  
            <li><Link to={routes.admin}><strong>Admin </strong></Link></li>
            
            
            {/* <li><Link to={client_routes.clients}><strong>Clients</strong></Link></li>
            <li><Link to={routes.account}> <strong>Account </strong></Link>   </li>
            <li><Link to={routes.signout}> <strong> SignOut </strong></Link></li>                                                         */}
        </ul>
    </div>
    )
};

const NonAuthItems = () => {
    return (
        <div>
            <ul>
                <li><Link to={routes.landing}><strong> Home</strong></Link></li>
                <li><Link to={routes.about}><strong> About</strong></Link></li>
                <li><Link to={routes.contact}><strong> Contact</strong></Link></li>
                <li><Link to={routes.signin}><strong> Login</strong></Link></li>
            </ul>

        </div>
    )

};


const MenuItems = props => {
    
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <AuthItems /> : <NonAuthItems />}
            </AuthUserContext.Consumer>            
        </div>
    );
}

export default MenuItems;
