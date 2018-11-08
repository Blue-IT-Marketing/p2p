
import React from "react";
import "./ContactMenu.css";

const ContactMenu = props => {
    return (
        <div className="contact-menu">
            <div className="box box-primary">
                <div className="box box-header">
                    <h3 className="box box-title"> Contact Menu</h3>
                </div>                
                <ul className="list-group">
                    <li className="list-group-item"><button className="btn btn-primary btn-block" onClick={e => props.onShowContactDetails(e)}>Contact Details</button></li>
                    <li className="list-group-item"><button className="btn btn-primary btn-block" onClick={e => props.onShowContactForm(e)}>Contact Form</button></li>
                </ul>
            </div>
        </div>
    )
}

export default ContactMenu