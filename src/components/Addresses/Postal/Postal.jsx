
import React, { Component } from "react";
import "./Postal.css";
import Axios from "axios";




class Postal extends Component{
    constructor(props){
        super(props);
        this.state = {
            postal_id : "",
            box : "",
            cityTown : "",
            province: "",
            country: "",
            postal_code : "",
        }

        this.onChange = this.onChange.bind(this);
        this.SavePostalAddress = this.SavePostalAddress.bind(this);
    };

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });

    };

    SavePostalAddress(e){
        
        let save_postal_address_url = '/address/postal/save';
        Axios.post(save_postal_address_url,"&data="+JSON.stringify(this.state)).then(function(response){
            if (response.status === 200){
                this.props.onPostalSaved(e);
            };
        });
    };

    componentWillMount(e){
        this.setState({
            postal_id: this.props.postal_id 
        });
    }

    render(){
        return(
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> Postal Address</h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label>Box </label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Box Number" name="box" value={this.state.box} onChange={e => this.onChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>City/Town </label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="City Town" name="cityTown" value={this.state.cityTown} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Province </label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Province" name="province" value={this.state.province} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Country </label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Country" name="country" value={this.state.country} onChange={e => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Postal Code </label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Postal Code" name="postal_code" value={this.state.postal_code} onChange={e => this.onChange(e)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-primary btn-block" onClick={e => this.SavePostalAddress(e)}> <strong> Save Postal Address</strong> </button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
};

export default Postal;