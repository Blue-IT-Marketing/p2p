
import React from "react";
import * as app_constants from '../../../constants/program_constants';

const ContactDetails = props => {
    return (
        <div className="contact-details">

            <div className="box box-header">
                <h3 className="box box-title">Contact Details</h3>
            </div>

            <div className="box box-footer">

                <ul className="list-group">
                    <li className="list-group-item"> Organization Name : {app_constants.app_name} </li>
                    <li className="list-group-item"> Cell : {app_constants.cell} </li>
                    <li className="list-group-item"> Email : {app_constants.email} </li>
                    <li className="list-group-item"> Fax : {app_constants.fax} </li>

                </ul>

            </div>
                    
        </div>
    )
}


export default ContactDetails