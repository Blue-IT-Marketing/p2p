
import React, { Component } from "react";



import "./Clients.css";
import Intro from "../Intro/Intro";
import Axios from "axios";
import * as Address from '../Addresses';
import ContactDetails from '../ContactDetails/ContactDetails';
import * as clients_routes from '../../constants/clients-routes';

import * as app_constants from '../../constants/program_constants';


let clients_details = {    
    client_id : "",
    group_id  : "",
    client_name : "",
    surname   : "",
    id_number : "",
    sex : "",    
};

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients_list :[],
        }
    }

    componentWillMount(e){
        this.setState({clients_list : this.props.clients_list})
    }

    render(){
        
        return (

            <div className="clients-list">
                <div className="box box-header">
                    <h3 className="box-title"> Clients List</h3>
                </div>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <td>Names</td>
                            <td>Surname</td>
                        </tr>
                    </thead>
                    <tbody>
                        {

                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Names</td>
                            <td>Surname</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
                                           
        )

    }


}


class Clients extends Component{
    constructor(){
        super();
        this.state = {
            client_details : clients_details,
            clients_list : [],

            list_client_details : true,
            create_client : false,

            add_client_details : false,
            add_postal_address : false,
            add_physical_address : false,
            add_contact_details : false,
        }
    }

    listClientDetails(e){
        this.setState({
            list_client_details: true,
            create_client : false,

            add_client_details: false,
            add_postal_address: false,
            add_physical_address: false,
            add_contact_details: false,            

        });
        this.loadClientList(e);

    }
    createClientDetails(e){
        this.setState({
            list_client_details: false,
            create_client: true,

            add_client_details: false,
            add_postal_address: false,
            add_physical_address: false,
            add_contact_details: false,            
        })
    }

    addClientDetails(e){
        this.setState({
            add_client_details: true,
            add_postal_address: false,
            add_physical_address: false,
            add_contact_details: false,
        })

    }

    addPostalAddress(e){
        this.setState({
            add_client_details: false,
            add_postal_address: true,
            add_physical_address: false,
            add_contact_details: false,
        })

    }
    addPhysicalAddress(e){
        this.setState({
            add_client_details: false,
            add_postal_address: false,
            add_physical_address: true,
            add_contact_details: false,
        })
    }
    addContactDetails(e){

        this.setState({
            add_client_details: false,
            add_postal_address: false,
            add_physical_address: false,
            add_contact_details: true,
        })
    }
    onSelectGroupHandler(e){

    }
    onSaveClientHandler(e){

    }
    
    onChangeHandler(e){

    }


    loadClientList(e){
        Axios.get(clients_routes.load_clients).then(function(response){
            if (response.status === 200){
                return response.data
            }
        }).then(function(data){
            let clients_list = JSON.parse(data);
            this.setState({clients_list});
        })
    }


    render(){
        return(
            <div className="clients-details">
                <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />
                <div className="row">
                    <div className="col-md-3">
                        <div className="box box-primary">
                            <div className="box box-header">
                                <h3 className="box-title"> Client Details</h3>
                            </div>

                            <button type="button" className="btn btn-primary btn-block" onClick={e => this.listClientDetails(e)}><strong>List Client Details</strong></button>
                            <button type="button" className="btn btn-primary btn-block" onClick={e => this.createClientDetails(e)}><strong>Create Client Details</strong></button>

                            {
                                (this.state.create_client) ?
                                    <div className="create-client">
                                        <div className="box box-footer">
                                            <div className="box box-header">
                                                <h3 className="box-title"> Create Client</h3>
                                            </div>
                                            <button type="button" className="btn btn-success btn-block" onClick={e => this.addClientDetails(e)}><strong>Add Client Details</strong></button>
                                            <button type="button" className="btn btn-success btn-block" onClick={e => this.addPostalAddress(e)}><strong>Add Postal Address</strong></button>
                                            <button type="button" className="btn btn-success btn-block" onClick={e => this.addPhysicalAddress(e)}><strong>Add Physical Address</strong></button>
                                            <button type="button" className="btn btn-success btn-block" onClick={e => this.addContactDetails(e)}><strong>Add Contact Details</strong></button>
                                        </div>
                                    </div>
                                :""
                            }
                        </div>
                    </div>
                    <div className="col-md-6">

                        {
                            (this.state.list_client_details && !this.state.create_client ) ?
                                <ClientsList clients_list={this.state.clients_list} />
                            :""
                        }

                        {
                            (this.state.add_client_details) ?
                                <div className="box box-body">
                                    <div className="box box-header">
                                        <h3 className="box-title"> Client Details</h3>
                                    </div>

                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label>Select Group</label>
                                            <div className="input-group">
                                                <select name="group_id" className="form-control" value={this.state.client_details.group_id} onChange={e => this.onSelectGroupHandler(e)}>
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Client Name</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="client_name" value={this.state.client_details.client_name} onChange={e => this.onChangeHandler(e)}/>
                                            </div>                                        
                                        </div>

                                        <div className="form-group">
                                            <label>Surname</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="surname" value={this.state.client_details.surname} onChange={e => this.onChangeHandler(e)}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>ID Number</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="id_number" value={this.state.client_details.id_number} onChange={ e => this.onChangeHandler(e) }/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Sex</label>
                                            <div className="input-group">
                                                <select name="sex" className="form-control" value={this.state.client_details.sex} onChange={e => this.onChangeHandler(e)}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Business Type</label>
                                            <div className="input-group">
                                                <input type="business_type" className="form-control" value={this.state.client_details.business_type} onChange={ e => this.onChangeHandler(e)}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <button type="button" className="btn btn-primary btn-block" onClick={e => this.onSaveClientHandler(e)}><strong>Save Client Details</strong></button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            : ""

                        }

                        {
                            (this.state.add_postal_address) ? 
                                <Address.Postal postal_id={this.state.client_details.client_id} />                                    
                            : ""

                        }

                        {
                            (this.state.add_physical_address) ?
                                <Address.Physical physical_id={this.state.client_details.client_id} />
                            : ""
                        }

                        {
                            (this.state.add_contact_details) ?
                                <ContactDetails contact_id={this.state.client_details.client_id} />

                                :""

                        }

                    </div>
                </div>
            </div>

        )
    }
}


export default Clients;