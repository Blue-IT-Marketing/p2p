import React, { Component } from 'react';
import './Wallet.css';
import Axios from 'axios';
import {
    firebase, auth
} from '../../firebase';
import SignInPage from '../User/SignIn/SignIn';
import Ionicon from 'react-ionicons';
import { Object } from 'core-js';


let bank_details = {
    bank_id: "",
    account_holder : "",
    bank_name : "",
    branch_code : "",
    account_number : "",
    account_type : "",
    paypal_email : ""
}

let wallet_details = {
    wallet_id : "",
    wallet_balance : "",
    total_funds_received : "",
    total_funds_sent : "",
    total_deposits: "",
    total_withdrawals: "",


}


let withdrawal_methods = {
    withdrawal_methods : ['Bank Deposit', 'PayPal', '']
}

let withdrawals_details = {
    withdrawal_id : "",
    withdrawal_amount : "",
    withdrawal_method : "",
    date_scheduled : ""
}

let deposits_details = {
    deposits_id : "",
    deposited_amount : "",
    date_deposited : "",
    method_of_deposit : "",
    deposit_approved : false,
}



class BankDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            Bank_Details : bank_details,
            form_response : ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveAccountHandler = this.onSaveAccountHandler.bind(this);
    }

    onChangeHandler(e){

        let Bank_Details = Object.assign({}, this.state.Bank_Details);

        switch(e.target.name) {
            case "account_holder" :  Bank_Details.account_holder = e.target.value; break;
            case "bank_name" : Bank_Details.bank_name = e.target.value; break;
            case "branch_code" : Bank_Details.branch_code = e.target.value; break;
            case "account_number" : Bank_Details.account_number = e.target.value; break;
            case "account_type" : Bank_Details.account_type = e.target.value; break;
            case "paypal_email" : Bank_Details.paypal_email = e.target.value; break;
            default: break;
        }

        this.setState({
            Bank_Details : Bank_Details
        })
    }

    onSaveAccountHandler(e){

        let banking_details = JSON.stringify(this.state.Bank_Details);        
        let save_bankind_details_url = '/wallet/save';
        let message = "";

        Axios.post(save_bankind_details_url,"&data=" + bank_details).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error(response.statusText);
            }
        }).then(function(data){
            let response_message = JSON.parse(data);
            message = response_message.message;
        }).catch(function(err){
            message = err.message;
        });

        this.setState({
            form_response : message
        })

    }

    componentWillMount(e){
        this.setState({
            Bank_Details : this.props.Bank_Details
        })
    }

    render(){
        let button_text = `Save & Activate Accounts for Withdrawals`;
        return(
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-cash" /> Bank Details</h3>
                    <hr/>
                    <span className="btn-outline-info">In order to enable withdrawals to your bank account please supply your banking details</span>
                </div>

                <form className="form-horizontal" onSubmit={e => this.onSaveAccountHandler(e)}>
                    <div className="form-group">
                    <label>Account Holder</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Account Holder" name="account_holder" value={this.state.Bank_Details.account_holder } onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Bank Name</label>
                        <div className="input-group">
                            <select name="bank_name" className="form-control" value={this.state.Bank_Details.bank_name} onChange={e => this.onChangeHandler(e)}>
                                <option value="fnb">FNB</option>
                                <option value="standard-bank">Standard Bank</option>
                                <option value="capitec">Capitec</option>
                                <option value="absa">ABSA</option>
                                <option value="nedbank">Ned Bank</option>
                            </select>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Branch Code</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Branch Code" name="branch_code" value={this.state.Bank_Details.branch_code} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Account Number</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Account Number" name="account_number" value={this.state.Bank_Details.account_number} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Account Type</label>
                        <div className="input-group">
                            <select className="form-control" name="account_type" value={this.state.Bank_Details.account_type} onChange={e => this.onChangeHandler(e)}>
                                <option value="savings">Savings</option>
                                <option value="transmission">Transmission</option>
                                <option value="cheque">Cheque</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>PayPal Email</label>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="PayPal Email Address" name="paypal_email" value={this.state.Bank_Details.paypal_email} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-app btn-flat btn-outline-success" onClick={e => this.onSaveAccountHandler(e)}> <strong> {button_text} </strong> </button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

class MyWallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            Wallet : wallet_details,
            loadWithdrawal : false,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onChangeHandler(e){


    }

    onShow(e){

        switch(e.target.name) {
            case "withdrawFunds" : 
                this.setState({
                    loadWithdrawal : true
                });
                console.log("Withdraw state modified");
                break;

            default : break;

        }

    }

    componentWillMount(e){
        this.setState({
            Wallet : this.props.Wallet
        })
    }


    render(){
        return(
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-card" /> Wallet</h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label>Balance </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="wallet_balance" value={this.state.Wallet.wallet_balance} onChange={e => this.onChangeHandler(e)} readOnly={true}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total Funds Received </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="total_funds_received" value={this.state.Wallet.total_funds_received} onChange={e => this.onChangeHandler(e)} readOnly={true}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total Funds Sent </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="total_funds_sent" value={this.state.Wallet.total_funds_sent} onChange={e => this.onChangeHandler(e)} readOnly={true}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total Deposits </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="total_deposits" value={this.state.Wallet.total_deposits} onChange={e => this.onChangeHandler(e)} readOnly={true} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total Withdrawals </label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="total_withdrawals" value={this.state.Wallet.total_withdrawals} onChange={e => this.onChangeHandler(e)} readOnly={true}/>
                        </div>
                    </div>

                    {
                        (this.state.loadWithdrawal) ? <DoWithDraw /> : ""

                    }

                    <div className="form-group">
                        <div className="input-group">
                        <div className="col-md-3">
                            <button type="button" className="btn btn-outline-dark btn-app btn-block" name="transferFunds"><strong>Transfer Funds</strong></button>
                        </div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-outline-dark btn-app btn-block" name="withdrawFunds" onClick={e => this.onShow(e)}><strong>Withdraw Funds</strong></button>
                        </div>

                        </div>
                    </div>


                </form>



            </div>
        )
    }
}


class DoWithDraw extends Component {
    constructor(){
        super();
        this.state =  {
            withdrawal_amount : "",
            withdrawal_method : "",
            date_scheduled : ""
        }
    }

    onChangeHandler(e){

    }

    render(){    
        return (
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> Withdrawal </h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Withdrawal Amount" name="withdrawal_amount" value={this.state.withdrawal_amount} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                        
                            <input type="text" className="form-control" placeholder="Withdrawal Method" name="withdrawal_method" value={this.state.withdrawal_method} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Date Scheduled" name="date_scheduled" value={this.state.date_scheduled} onChange={e => this.onChangeHandler(e)} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class MyWithDrawals extends Component{
    constructor(props){
        super();
            this.state = {
                Withdrawals : withdrawals_details,
                Withdrawals_List : []
            
            }
    }

    componentWillMount(e){
        this.setState({            
            Withdrawals_List: this.props.Withdrawals_List
        })
    }

    render(){
        return (
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-basket" />  Withdrawals</h3>
                </div>


                <table className="table table-borderless table-info">

                    <thead>
                        <tr>
                            <td><strong>Amount</strong></td>
                            <td><strong>Method</strong></td>
                            <td><strong>Date</strong></td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Amount</strong></td>
                            <td><strong>Method</strong></td>
                            <td><strong>Date</strong></td>
                        </tr>
                    </tfoot>
                    
                </table>

            </div>
        )
    }
}


class  MyDeposits extends Component{
    constructor(props){
        super(props);
        this.state = {
            Deposits: deposits_details,
            Deposits_List : []
        }
    }


    componentWillMount(e){
        this.setState({
            Deposits_List : this.props.Deposits_List
        })
    }


    render(){
        return(
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-battery-charging" /> Deposits</h3>
                </div>


            </div>
        )
    }
}

class Wallet extends Component{
    constructor(){
        super();
        this.state = {
            Bank_Details : {...bank_details},
            Wallet : {...wallet_details},
            Withdrawals_List : [],
            Deposits_List : [],

            loadBankDetails : false,
            loadMyWallet : false,
            loadWithdrawals : false,
            loadDeposits : false,


        }

        this.onShow = this.onShow.bind(this);
    };


    onShow(e){

        switch(e.target.name){
            case "accounts" : 
            this.setState({
                loadBankDetails: true,
                loadMyWallet: false,
                loadWithdrawals: false,
                loadDeposits: false,

            }); break;

            case "wallet" : 
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: true,
                    loadWithdrawals: false,
                    loadDeposits: false,

                }); break;

            case "withdrawals":
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: false,
                    loadWithdrawals: true,
                    loadDeposits: false,
                }); break;

            case "deposits":
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: false,
                    loadWithdrawals: false,
                    loadDeposits: true,
                }); break;
            default: break;
        }

    }


    render(){
        return (
            <div className="box box-body">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-card"/> Wallet </h3>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="accounts" onClick={e => this.onShow(e)}> <Ionicon icon="ios-cash" /> Accounts </button>
                    </div>                    
                    <div className="col-md-3">                    
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="wallet" onClick={e => this.onShow(e)}> <Ionicon icon="ios-card" /> Wallet</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="withdrawals" onClick={e => this.onShow(e)}> <Ionicon icon="ios-basket" /> Withdrawals</button>
                    </div>
                    <div className="col-md-3">                    
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="deposits" onClick={e => this.onShow(e)}> <Ionicon icon="ios-battery-charging" /> Deposits</button>                    
                    </div>
                </div>

                <div className="row">
                {
                        (this.state.loadBankDetails) ? <BankDetails Bank_Details={this.state.Bank_Details} /> : ""
                }
                {
                        (this.state.loadMyWallet) ? <MyWallet Wallet={this.state.Wallet} /> : ""
                }

                {
                        (this.state.loadWithdrawals) ? <MyWithDrawals Withdrawals_List={this.state.Withdrawals_List} /> : ""
                }

                {
                        (this.state.loadDeposits) ? <MyDeposits Deposits_List={this.state.Deposits_List} /> : ""
                }
                    
                    
                </div>


            </div>
        )
    }

}




export default Wallet;