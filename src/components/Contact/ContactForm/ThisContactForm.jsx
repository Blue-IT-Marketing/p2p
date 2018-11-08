import React, { Component } from 'react';
import axios from "axios";

class ThisContactForm extends Component {
    constructor (){
        super();
        this.state = {
            names : "",
            email : "",
            cell: "",
            subject: "",
            message: "",
            form_messages : ""
        }
    }


    change (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitContactForm (e){
        e.preventDefault();        
        console.log(this.state);
        let data = JSON.stringify(this.state);
        console.log(data);      

        axios.post("/contact/submit-contact-form","data=" + data).then( function(response){
            if (response.status === 200){
                return response.data;
            }
        }).then(function(data){
            this.setState({
                form_messages: data
            })
            // let response_dom = document.getElementById("contactFormResponse");
            // response_dom.innerHTML = data;
        })
    }



    render (){
        
        return (
        <div className="col-md-6">
        <div className="box box-header">
            <h3 className="box-title"> Contact Form</h3>
        </div>
        <form className="form-horizontal">
            <div className="form-group">            
                <input className="form-control" name="names" placeholder="Names" value={this.state.names} onChange={e => this.change(e)}/>
            </div>
            <div className="form-group">
                <input className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={e => this.change(e)}/>
            </div>
            <div className="form-group">
                <input className="form-control" name="cell" placeholder="Cell" value={this.state.cell} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                <input className="form-control" name="subject" placeholder="Subject" value={this.state.subject} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                <textarea className="form-control" name="message" placeholder="Message" value={this.state.message} onChange={e => this.change(e)} />
            </div>
            <div className="form-group">
                        <button type="button" className="btn btn-primary btn-lg" onClick={e => this.onSubmitContactForm(e)}><strong>Submit Message</strong></button>
            </div>
            <div className="form-group">
                        <p>{this.state.form_messages}</p>
            </div>
        </form>
        </div>
        )
    };

}

export default ThisContactForm