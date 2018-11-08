
import React, { Component } from "react";
import "./ContactDetails.css";
import Axios from "axios";



let contact_details = {
    contact_id : "",
    contact_person: "",
    position:"",
    cell: "",
    tel: "",
    fax:"",
    email:""
};

class ContactDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            contact_details : contact_details,
            contact_details_saved : false
        };

        this.onHandleChange = this.onHandleChange.bind(this);
        this.SaveContactDetails = this.SaveContactDetails.bind(this);

    }
    
    onHandleChange(e){
        let contact_details = Object.assign([], this.state.contact_details);
        switch(e.target.name){
            case "contact_person": contact_details.contact_person = e.target.value; break;
            case "position" : contact_details.position = e.target.value; break;
            case "cell" : contact_details.cell = e.target.value; break;
            case "tel" : contact_details.tel = e.target.value; break;
            case "fax" : contact_details.fax = e.target.value; break;
            case "email" : contact_details.email = e.target.value; break;
            default: break;
        };
        this.setState({contact_details});
    }

    SaveContactDetails(e){
        //send contact details to backend
        let contact_details = Object.assign([], this.state.contact_details);
        contact_details = JSON.stringify(contact_details);
        let save_contact_details_url = '/contact-details/save';
        Axios.post(save_contact_details_url,"&data=" + contact_details).then(function(response){
            if (response.status === 200){
                this.setState({contact_details_saved:true});
                this.props.onContactSaved(e);
            }
        });
    }

    componentWillMount(e){
        let contact_details = Object.assign([], this.state.contact_details);
        contact_details.contact_id = this.props.contact_id;
        this.setState({contact_details});
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Contact Details</h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label>Contact Person</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="contact_person" value={this.state.contact_details.contact_person} onChange={e => this.onHandleChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Position</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="position" value={this.state.contact_details.position} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Cell</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="cell" value={this.state.contact_details.cell} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tel</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="tel" value={this.state.contact_details.tel} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Fax</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="fax" value={this.state.contact_details.fax} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="email" value={this.state.contact_details.email} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-primary btn-block" onClick={e => this.SaveContactDetails(e)}><strong>Save Contact Details</strong></button>
                        </div>
                    </div>


                </form>


            </div>
        )
    }
};


export default ContactDetails;