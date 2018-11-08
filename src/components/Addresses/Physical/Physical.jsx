
import React, {Component} from "react";
import './Physical.css';
import Axios from "axios";


class Physical extends Component{
    constructor(){
        super();
        this.state = {
            physical_id : "",
            stand : "",
            street_name: "",
            cityTown: "",
            province: "",
            country: "",
            postal_code: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSavePhysicalAddress = this.onSavePhysicalAddress.bind(this);
    };

    onSavePhysicalAddress(e){
        // save the physical address to the back end
        let save_physical_address = '/address/physical/save';
        Axios.post(save_physical_address, "&data="+JSON.stringify(this.state)).then(function(response){
            if (response.status === 200){
                this.propr.onPhysicalSaved(e);
            };
        });
    };

    onHandleChange(e){
        this.setState({[e.target.name]: e.target.value})
    };

    componentWillMount(e){
        this.setState({
            physical_id : this.props.physical_id
        });
    };

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Physical Address </h3>
                </div>


                <form className="form-horizontal">
                    <div className="form-group">
                        <label>Stand</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="stand" value={this.state.stand} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Street Name</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="street_name" value={this.state.street_name} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>City Town</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="cityTown" value={this.state.cityTown} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Province</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="province" value={this.state.province} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="country" value={this.state.country} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Postal Code</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="postal_code" value={this.state.postal_code} onChange={e => this.onHandleChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-primary btn-block" onClick={e => this.onSavePhysicalAddress(e)}> <strong>Save Physical Address</strong></button>
                        </div>
                    </div>


                </form>

            </div>
        )
    }
};

export default Physical;

