
import React, { Component } from "react";
import ContactMenu from "./ContactMenu/ContactMenu";
import * as app_constants from '../../constants/program_constants';
import "./Contact.css";
import Intro from "../Intro/Intro";
import ThisContactForm from './ContactForm/ThisContactForm';
import ContactDetails from './ContactDetails/ContactDetails';

class Contact extends Component {
    constructor(){
        super();
        this.state = {
            show_contact_form : true,
            show_contact_details : false,
        }

        this.onShowContactDetails = this.onShowContactDetails.bind(this);
        this.onShowContactForm = this.onShowContactForm.bind(this);
    };

    onShowContactForm(e){
        this.setState({
            show_contact_form: true,
            show_contact_details: false,
        })
    }

    onShowContactDetails(e){
        this.setState({
            show_contact_form: false,
            show_contact_details: true,
        })

    }

    render(){

    return (
        <div className="contact">
            <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />
            <div className="row">
                <div className="col-md-3">
                    <ContactMenu onShowContactDetails={this.onShowContactDetails} onShowContactForm={this.onShowContactForm}/>
                </div>
                <div className="col-md-9">
                    {
                        (this.state.show_contact_form) ? 
                        <ThisContactForm /> : ""                    
                    }
                    {
                        (this.state.show_contact_details) ?
                            <ContactDetails /> : ""
                    }
                </div>        
            </div>
        </div>
        )
    }
}


export default Contact