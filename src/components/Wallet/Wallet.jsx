import React, { Component } from 'react';
import './Wallet.css';
import Axios from 'axios';
import {
    firebase, auth
} from '../../firebase';
import SignInPage from '../User/SignIn/SignIn';
import Ionicon from 'react-ionicons';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import * as utilities from '../../constants/utilities';
import { Manager } from 'react-popper';

let bank_details = {
    bank_id: "",
    account_holder : "",
    bank_name : "",
    branch_code : "",
    account_number : "",
    account_type : "",
    paypal_email : "",
    e_wallet : "" // cell phone number for e-wallet transactions
}

let wallet_details = {
    wallet_id : "",
    wallet_balance : "0",
    total_funds_received : "0",
    total_funds_sent : "0",
    total_deposits: "0",
    total_withdrawals: "0",
    withdrawal_limit: "1000"
}


let withdrawal_methods = {
    withdrawal_methods : ['bank-deposit', 'paypal', 'e-wallet']
}

let withdrawals_details = {
    withdrawal_id : "",
    withdrawal_amount : "",
    withdrawal_method : "",
    date_scheduled : "",
    transaction_status: "waiting_approval", 

    // waiting_approval : true, // transaction is awaiting approval by our moderators
    // approved: true, // transaction is approved
    // pending: true, // transaction is pending
    // completed:true, // transaction is completed
    // failed : true, // transaction has failed
    // fundsheld : true, // transaction not completed because your funds where held
}

let deposits_details = {
    deposits_id : "",
    deposited_amount : "",
    date_deposited : "",
    method_of_deposit : "",
    deposit_approved : false
}


class MyPayPal extends Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'ZAR'; // or you can set this value from your props or state
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox: 'YOUR-SANDBOX-APP-ID',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}



const BankAccount = props => {
    return (
        <form className="form-horizontal col-md-6" onSubmit={e => props.onSaveAccountHandler(e)}>
            <div className="form-group">
                <label>Account Holder</label>
                <div className="input-group">                        
                    <input type="text" className="form-control" placeholder="Account Holder" name="account_holder" value={props.Bank_Details.account_holder} onChange={e => props.onChangeHandler(e)} />
                </div>
            </div>
            <div className="form-group">
                <label>Bank Name</label>
                <div className="input-group">
                    <select name="bank_name" className="form-control" value={props.Bank_Details.bank_name} onChange={e => props.onChangeHandler(e)}>
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
                    <input type="text" className="form-control" placeholder="Branch Code" name="branch_code" value={props.Bank_Details.branch_code} onChange={e => props.onChangeHandler(e)} />
                </div>
            </div>
            <div className="form-group">
                <label>Account Number</label>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Account Number" name="account_number" value={props.Bank_Details.account_number} onChange={e => props.onChangeHandler(e)} />
                </div>
            </div>
            <div className="form-group">
                <label>Account Type</label>
                <div className="input-group">
                    <select className="form-control" name="account_type" value={props.Bank_Details.account_type} onChange={e => props.onChangeHandler(e)}>
                        <option value="savings">Savings</option>
                        <option value="transmission">Transmission</option>
                        <option value="cheque">Cheque</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <button type="button" className="btn btn-app btn-flat btn-outline-success btn-block" onClick={e => props.onSaveAccountHandler(e)}> <strong> Activate Bank Account </strong> </button>
                </div>
            </div>

</form>
    )

}


const PayPalAccount = props => {
    return (
        <form className="form-horizontal col-md-6">
        <div className="form-group">
            <label>PayPal Email</label>
            <div className="input-group">
                <input type="email" className="form-control" placeholder="PayPal Email Address" name="paypal_email" value={props.Bank_Details.paypal_email} onChange={e => props.onChangeHandler(e)} />
            </div>
        </div>
            <div className="form-group">
                <div className="input-group">
                    <button type="button" className="btn btn-app btn-flat btn-outline-success btn-block" onClick={e => props.onSaveAccountHandler(e)}> <strong> Activate PayPal </strong> </button>
                </div>
            </div>


        </form>

    )
}


const EWallet = props => {
    return (
        <form className="form-horizontal col-md-6">
            <div className="form-group">
                <label>E-Wallet</label>
                <div className="input-group">
                    <input type="tel" className="form-control" placeholder="E-Wallet Cell" name="e-wallet" value={props.Bank_Details.e_wallet} onChange={e => props.onChangeHandler(e)} />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <button type="button" className="btn btn-app btn-flat btn-outline-success btn-block" onClick={e => props.onSaveAccountHandler(e)}> <strong> Activate E-Wallet </strong> </button>
                </div>
            </div>

        </form>        

    )    
}

class BankDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            Bank_Details : bank_details,
            form_response : "",
            loadBankAccount : true,
            loadPayPal : false,
            loadEWallet : false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveAccountHandler = this.onSaveAccountHandler.bind(this);
        this.onSwitchScreen = this.onSwitchScreen.bind(this);
    }

    onSwitchScreen(e){
        switch(e.target.name){
            case "bankaccount" : 
            this.setState({
                loadBankAccount: true,
                loadPayPal: false,
                loadEWallet: false

            }); break;
            case "paypal" :
                this.setState({
                    loadBankAccount: false,
                    loadPayPal: true,
                    loadEWallet: false

                }); break;

            case "ewallet":
                this.setState({
                    loadBankAccount: false,
                    loadPayPal: false,
                    loadEWallet: true

                }); break;

            default:break;

        }
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
            case "e_wallet" : Bank_Details.e_wallet = e.target.value;break;
            default: break;
        }

        this.setState({
            Bank_Details : Bank_Details
        })
    }

    onSaveAccountHandler(e){
        console.log("Saving Account Details");

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
                    <h3 className="box-title"> <Ionicon icon="ios-cash" /> Banking Details</h3>

                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="bankaccount" onClick={e => this.onSwitchScreen(e)}><strong><i className="fa fa-bank"> </i> Account Details </strong></button>
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="paypal" onClick={e => this.onSwitchScreen(e)}><strong><i className="fa fa-cc-paypal"> </i> PayPal </strong></button>
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="ewallet" onClick={e => this.onSwitchScreen(e)}><strong><i className="fa fa-phone-alt"> </i> E-Wallet </strong></button>
                    </div>
                    <hr />
                    <span className="btn-outline-info">In order to enable withdrawals to your bank account please supply your banking details</span>
                </div>

                {
                    (this.state.loadBankAccount) ? 
                    <BankAccount 
                            Bank_Details = {this.state.Bank_Details}
                            onSaveAccountHandler={this.onSaveAccountHandler}
                            onChangeHandler={this.onChangeHandler}
                    />
                    : ""
                }
                {
                    (this.state.loadPayPal) ?
                    <PayPalAccount 
                            Bank_Details={this.state.Bank_Details}
                            onSaveAccountHandler={this.onSaveAccountHandler}
                            onChangeHandler={this.onChangeHandler}
                    />
                    : ""

                }

                {
                    (this.state.loadEWallet) ?
                    <EWallet
                        Bank_Details={this.state.Bank_Details}
                        onSaveAccountHandler={this.onSaveAccountHandler}
                        onChangeHandler={this.onChangeHandler}
                    />
                    : ""

                }
            </div>
        )
    }
}


const ShowWallet = props => {
    return (

        <ul className="list-group">
            <li className="list-group-item"><strong> Balance : </strong> <span className="active"> R { props.Wallet.wallet_balance}</span></li>
            <li className="list-group-item"><strong> Total Funds Received : </strong> <span className="active"> R {props.Wallet.total_funds_received} </span></li>
            <li className="list-group-item"><strong> Total Funds Sent : </strong> <span className="active">  R {props.Wallet.total_funds_sent} </span></li>
            <li className="list-group-item"><strong> Total Deposits : </strong> <span className="active"> R {props.Wallet.total_deposits} </span></li>
            <li className="list-group-item"><strong> Total Withdrawals : </strong> <span className="active"> R {props.Wallet.total_withdrawals}</span> </li>
            <li className="list-group-item"><strong> Daily Withdrawal Limit : </strong> <span className="active"> R {props.Wallet.withdrawal_limit} </span></li>
        </ul>
    )
}




class DoWithDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            wallet_balance: "", 
            withdrawal_limit: "",
            withdrawal_amount: "",
            withdrawal_method: "",
            date_scheduled: "7 Days",

        }
    }

    doNothing(e) {
        alert("all withdrawals are scheduled seven days from the time of withdrawal request");
    }

    onChangeHandler(e) {

        try {
            console.log("State : " + this.state);

            switch (e.target.name) {
                case "withdrawal_amount":
                    console.log(e.target.value);
                    if (utilities.isNumber(e.target.value)) {

                        let withdrawAmount = parseInt(e.target.value);
                        let dailyLimit = parseInt(this.state.withdrawal_limit);
                        let wallet_balance = parseInt(this.state.wallet_balance);
                        
                        //setting daily_limit and wallet balance to prevent user from withdrawing more than available funds
                        if (wallet_balance < dailyLimit){
                            dailyLimit = wallet_balance
                        }

                        console.log(withdrawAmount, dailyLimit);

                        if (withdrawAmount > dailyLimit) {
                            //this will make sure that withdrawal amount is not more than available amount or daily limit
                            this.setState({
                                withdrawal_amount: dailyLimit
                            })
                            
                        } else {
                            this.setState({
                                withdrawal_amount: e.target.value
                            })
                        }
                    } else {
                        this.setState({
                            withdrawal_amount: "0"
                        })

                    }
                    break;
                default:
                    this.setState({
                        [e.target.name]: e.target.value
                    })
                    break;
            }

        } catch{
            this.setState({
                withdrawal_amount: "0"
            })

        }
    }

    componentWillMount(e) {
        this.setState({
            withdrawal_limit: this.props.withdrawal_limit,
            withdrawal_amount: "0",
            wallet_balance: this.props.wallet_balance
        })
    }

    render() {
        return (
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> Withdrawal </h3>
                </div>
                
                <span className="btn-outline-info"> <strong> <i className="fa fa-arrow-circle-o-down"> </i> Available funds : R {this.state.wallet_balance} </strong></span>

                <div className="box box-footer">
                    <div className="form-group">
                        <label className="col-xl-6 pull-left">Withdrawal Amount </label>
                        <div className="input-group alert-danger">
                            <select className="form-control" placeholder="Withdrawal Amount" name="withdrawal_amount" value={this.state.withdrawal_amount} onChange={e => this.onChangeHandler(e)}>
                                <option value="0">0 ZAR</option>
                                <option value="250">250 ZAR</option>
                                <option value="300">300 ZAR</option>
                                <option value="400">400 ZAR</option>
                                <option value="500">500 ZAR</option>
                                <option value="600">600 ZAR</option>
                                <option value="700">700 ZAR</option>
                                <option value="800">800 ZAR</option>
                                <option value="900">900 ZAR</option>
                                <option value="1000">1,000.00 ZAR</option>
                                <option value="2000">2,000.00 ZAR</option>
                                <option value="2500">2,500.00 ZAR</option>
                                <option value="3000">3,000.00 ZAR</option>
                                <option value="3500">3,500.00 ZAR</option>
                                <option value="4000">4,000.00 ZAR</option>
                                <option value="4500">4,500.00 ZAR</option>
                                <option value="5000">5,000.00 ZAR</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-xl-6 pull-left">Withdrawal Method</label>
                        <div className="input-group">
                            <select name="withdrawal_method" className="form-control" value={this.state.withdrawal_method} onChange={e => this.onChangeHandler(e)} >
                                <option value="bank-deposit">Bank Deposit</option>
                                <option value="paypal">PayPal</option>
                                <option value="e-wallet">E-Wallet</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-xl-6 pull-left">Schedule</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Date Scheduled" name="date_scheduled" value={this.state.date_scheduled} onChange={e => this.doNothing(e)} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6">
                            <button type="button" className="btn btn-warning btn-block"><strong> <i className="fa fa-calendar"> </i> Schedule Withdrawal</strong></button>
                        </div>
                        <div className="col-xl-6">
                            <button type="button" className="btn btn-danger btn-block" onClick={e => this.props.doCancel(e)}><strong> <i className="fa fa-cut"> </i> Close Withdrawal</strong></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


//transfer funds from wallet to loan pocket
class TransferFunds extends Component {
    constructor(props){
        super(props);
        this.state = {
            Wallet : wallet_details,


        }
    }


    render(){
        return(
            <div>
                <span className="alert-warning"> Please complete p2p loan module first</span>
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
            loadTransferFunds : false,
            showWallet : true
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onChangeHandler(e){
    }

    doCancelModals(e){
        this.setState({
            loadWithdrawal: false,
            loadTransferFunds: false,
            showWallet : true,
        })
    }

    onShow(e){
        let prevStatus = this.state;

        switch(e.target.name) {
            case "withdrawFunds" : 
                this.setState({
                    loadWithdrawal : true,
                    loadTransferFunds: false,
                    showWallet: false

                });
                console.log("Withdraw state modified");
                break;
            case "transferFunds" : 
            this.setState({
                loadTransferFunds: true,
                loadWithdrawal : false,
                showWallet: false
            });
            break;

            case "wallet" :
                this.setState({
                    loadTransferFunds: false,
                    loadWithdrawal: false,
                    showWallet : true


                });
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
                    <h3 className="box-title pull-left"> <Ionicon icon="ios-card" /> Wallet</h3>

                    <div className="box-tools pull-right">                                                
                        <button type="button" className="btn btn-outline-dark btn-box-tool" name="transferFunds" onClick={e => this.onShow(e)}><strong> <i className="fa fa-terminal"> </i> Transfer Funds</strong></button>                                                    
                        <button type="button" className="btn btn-outline-dark btn-box-tool" name="withdrawFunds" onClick={e => this.onShow(e)}><strong> <i className="fa fa-ticket"> </i> Withdraw Funds</strong></button>
                        <button type="button" className="btn btn-outline-dark btn-box-tool" name="wallet" onClick={e => this.onShow(e)}><strong> <i className="fa fa-google-wallet"> </i>  Show Wallet</strong></button>
                    </div>

                </div>
                    {
                        (this.state.showWallet) ? 
                        <ShowWallet 
                            Wallet={this.state.Wallet} 
                        /> : ""
                    }
                    {
                        (this.state.loadWithdrawal) ? 
                        <DoWithDraw 
                            wallet_balance={this.state.Wallet.wallet_balance} 
                            withdrawal_limit={this.state.Wallet.withdrawal_limit} 
                            doCancel={this.doCancelModals.bind(this)} 
                        /> : ""
                    }
                    {
                        (this.state.loadTransferFunds) ?
                            <TransferFunds
                                Wallet={this.state.Wallet}
                            />
                            : ""
                    }                
            </div>
        )
    }
}



const WithdrawalsListItems = props => {
    return(
        <tr>
            <td>{props.transaction_id}</td>
            <td>{props.amount}</td>
            <td>{props.method}</td>
            <td>{props.date}</td>
            <td>{props.status}</td>
        </tr>
    )
}


const WithdrawalList = props => {
    return (
        <table className="table table-borderless table-info">
            <thead>
                <tr>
                    <td><strong>Transaction ID</strong></td>
                    <td><strong>Amount</strong></td>
                    <td><strong>Method</strong></td>
                    <td><strong>Date</strong></td>
                    <td><strong>Transaction Status</strong></td>

                </tr>
            </thead>
            <tbody>

                {
                    props.Withdrawals_List.map((withdrawal, index) => {
                        return (
                            <WithdrawalsListItems
                                amount={withdrawal.withdrawal_amount}
                                method={withdrawal.withdrawal_method}
                                date={withdrawal.date_scheduled}
                                status={withdrawal.transaction_status}
                                transaction_id={withdrawal.withdrawal_id}
                                key={withdrawal.withdrawal_id}
                            />
                        )

                    })
                }

            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Transaction ID</strong></td>
                    <td><strong>Amount</strong></td>
                    <td><strong>Method</strong></td>
                    <td><strong>Date</strong></td>
                    <td><strong>Transaction Status</strong></td>
                </tr>
            </tfoot>
        </table>
    )
}



// used to 1. boost withdrawals so that they occur faster, 2. speed up the status of a withdrawal
// used to cancel a withdrawal
// change the method of payment on a withdrawal
// cancel a withdrawal


// wallet_balance = { this.state.Wallet.wallet_balance }
// withdrawal_limit = { this.state.Wallet.withdrawal_limit }
// Withdrawals_List = { this.state.Withdrawals_List }

class ManageWithdrawals extends Component{
    constructor(props){
        super(props);
        this.state = {
            Wallet : wallet_details,
            Withdrawals_List : [],
            withdrawal_item : "",

            buttonsDisabled : true,

        }

        this.handleWithdrawalChange = this.handleWithdrawalChange.bind(this);
        this.handlerManagerChanger = this.handlerManagerChanger.bind(this);
        this.updateBackEnd = this.updateBackEnd.bind(this);
    }

    updateBackEnd(e){
        //update all state values to the backend

    }

    handleWithdrawalChange(e){
        let withdrawals = Object.assign([],this.state.Withdrawals_List);
        let selected_withdrawal = withdrawals.find(withdrawal => withdrawal.withdrawal_id === e.target.value)
        this.setState({
            withdrawal_item : selected_withdrawal,
            buttonsDisabled : false
        })

    };

    handlerManagerChanger(e){

        switch(e.target.name){

            case "date_scheduled":
                console.log("updating date");
                break;
            case "withdrawal_amount":
                try{
                    let withdrawal_amount = parseInt(e.target.value);
                    let previous_amount = parseInt(this.state.withdrawal_item.withdrawal_amount);
                    if (withdrawal_amount > previous_amount){
                        //new withdrawal amount is greator than previous amount
                        let additional_amount = withdrawal_amount - previous_amount;
                        let balance = parseInt(this.state.Wallet.wallet_balance);
                        if (balance < additional_amount){
                            //use balance and then zero the wallet
                            let wallet = Object.assign({},this.state.Wallet);
                            wallet.wallet_balance = "0";

                            let withdrawal_item = Object.assign({},this.state.withdrawal_item);
                            let withdrawal_amount = parseInt(withdrawal_item.withdrawal_amount) + balance;
                            withdrawal_item.withdrawal_amount = withdrawal_amount;
                            
                            let withdrawal_items_list = Object.assign([],this.state.Withdrawals_List);

                            let position = withdrawal_items_list.findIndex( thiswithdrawal_item => withdrawal_item.withdrawal_id === withdrawal_item.withdrawal_id);
                            withdrawal_items_list[position] = withdrawal_item;


                            this.setState({
                                Wallet : wallet,
                                withdrawal_item: withdrawal_item,
                                Withdrawals_List : withdrawal_items_list
                            });

                            this.updateBackEnd();

                        }else{
                            //subtract additional from wallet balance and then add the remaining balance back to wallet
                            let 

                        }
                    }

                }catch{

                }


                break;

            case "withdrawal_method":
                console.log("withdrawal method changing");
                break;

            default: break;
        }

    }

    componentWillMount(e){
        this.setState({
            Wallet: this.props.Wallet,
            Withdrawals_List : [
                {
                    withdrawal_id: "dsfsdf",
                    withdrawal_amount: "500",
                    withdrawal_method: "e-wallet",
                    date_scheduled: "2018-09-09",
                    transaction_status: "waiting_approval", 

                },
                {
                    withdrawal_id: "dsfsdf343245",
                    withdrawal_amount: "600",
                    withdrawal_method: "e-wallet",
                    date_scheduled: "2019-09-09",
                    transaction_status: "waiting_approval",

                }

            ]
        })
    }

// let withdrawals_details = {
//     withdrawal_id: "",
//     withdrawal_amount: "",
//     withdrawal_method: "",
//     date_scheduled: "",
//     transaction_status: "waiting_approval", 

    render(){
        return(
            <div className="box box-footer">
                <div className="box box-header">
                <h3 className="box-title"><strong> <i className="fa fa-wrench"> </i>   Withdrawal Manager</strong></h3>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label>Select Withdrawal</label>
                        <div className="input-group">
                            <select className="form-control" name="withdrawal_items" value={this.state.withdrawal_item.withdrawal_id} onChange={ e => this.handleWithdrawalChange(e)}>
                                {
                                    this.state.Withdrawals_List.map((withdrawal_item,index) => {
                                        return(
                                            <option value={withdrawal_item.withdrawal_id}> {withdrawal_item.date_scheduled} : {withdrawal_item.withdrawal_amount} : {withdrawal_item.withdrawal_method} :  {withdrawal_item.transaction_status}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="box box-footer">
                                <div className="form-group">
                                    <label>Date Scheduled</label>
                                    <div className="input-group">
                                    <input type="date" className="form-control" name="date_scheduled" value={this.state.withdrawal_item.date_scheduled} onChange={e => this.handlerManagerChanger(e)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Withdrawal Amount</label>
                                    <div className="input-group">
                                    <input type="number" className="form-control" name="withdrawal_amount" value={this.state.withdrawal_item.withdrawal_amount} onChange={e => this.handlerManagerChanger(e)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Withdrawal Method</label>
                                    <div className="input-group">
                                        <select name="withdrawal_method" className="form-control" value={this.state.withdrawal_item.withdrawal_method} onChange={e => this.handlerManagerChanger(e)} >
                                            <option value="bank-deposit">Bank Deposit</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="e-wallet">E-Wallet</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <button type="button" className="btn btn-app btn-block btn-outline-dark" name="update" disabled={this.state.buttonsDisabled}><strong> <i className="fa fa-save"> </i>  Update Schedule</strong></button>
                                        </div>
                                        <div className="col-md-4">
                                        <button type="button" className="btn btn-app btn-block btn-outline-danger" name="cancel" disabled={this.state.buttonsDisabled}><strong> <i className="fa fa-cut"> </i>  Cancel Schedule</strong></button>
                                        </div>
                                        <div className="col-md-4">
                                        <button type="button" className="btn btn-app btn-block btn-outline-info" name="sametime" disabled={this.state.buttonsDisabled}><strong> <i className="fa fa-angle-double-up"> </i>  Upgrade to Express </strong></button>
                                        </div>                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

class MyWithDrawals extends Component{
    constructor(props){
        super(props);
            this.state = {
                Wallet : wallet_details,
                
                Withdrawals_List : [],

                
                loadManager : false,
                loadWithdraw : false,
                loadWithdrawalList : true,
            
            };
        this.onSwitchScreen = this.onSwitchScreen.bind(this);
        this.doCancelWithdrawal = this.doCancelWithdrawal.bind(this);
    }
    doCancelWithdrawal(e){
        this.setState({

            loadManager: false,
            loadWithdraw: false,
            loadWithdrawalList: true,
        });

    }

    onSwitchScreen(e){
        switch(e.target.name){

            case "manage":
                this.setState({                    
                    loadManager: true,
                    loadWithdraw: false,
                    loadWithdrawalList: false,
                });
                break;
            case "withdraw":
                this.setState({                    
                    loadManager: false,
                    loadWithdraw: true,
                    loadWithdrawalList: false,
                });
                break;
            case "withdrawallist":
                this.setState({
                    
                    loadManager: false,
                    loadWithdraw: false,
                    loadWithdrawalList: true,
                });
                break;
            default: break;
        }

    }

    componentWillMount(e){
        this.setState({            
            Withdrawals_List: this.props.Withdrawals_List,
            Wallet : this.props.Wallet
        })
    }

    render(){
        return (
            <div className="box box-footer">
                <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-basket" />  Withdrawals</h3>
                    <div className="box-tools">                        
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="withdrawallist" onClick={e => this.onSwitchScreen(e)}><strong> <i className="fa fa-table"> </i>  Withdrawals </strong></button>                        
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="withdraw" onClick={e => this.onSwitchScreen(e)}><strong> <i className="fa fa-shopping-basket"> </i>  Withdraw </strong></button>
                        <button type="button" className="btn btn-box-tool btn-outline-dark" name="manage" onClick={e => this.onSwitchScreen(e)}><strong> <i className="fa fa-wrench"> </i>  Manage </strong></button>
                        
                    </div>
                </div>

                {
                    (this.state.loadWithdrawalList) ?
                    <WithdrawalList
                        Withdrawals_List = {this.state.Withdrawals_List}
                    />
                    : ""
                }
                {
                    (this.state.loadWithdraw) ?
                    <DoWithDraw
                            wallet_balance={this.state.Wallet.wallet_balance}
                            withdrawal_limit={this.state.Wallet.withdrawal_limit}
                            doCancel={this.doCancelWithdrawal} 
                    />:""
                }
                {
                    (this.state.loadManager) ?
                    <ManageWithdrawals
                            Wallet={this.state.Wallet}
                            Withdrawals_List={this.state.Withdrawals_List}
                            

                    />:""
                }

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

            walletButtonEnabled : false,
            bankButtonEnabled : false,
            withdrawalButtonEnabled : false,
            depositsButtonEnabled : false,
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

                walletButtonEnabled: false,
                bankButtonEnabled: true,
                withdrawalButtonEnabled: false,
                depositsButtonEnabled: false,

            }); break;

            case "wallet" : 
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: true,
                    loadWithdrawals: false,
                    loadDeposits: false,

                    walletButtonEnabled: true,
                    bankButtonEnabled: false,
                    withdrawalButtonEnabled: false,
                    depositsButtonEnabled: false,


                }); break;

            case "withdrawals":
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: false,
                    loadWithdrawals: true,
                    loadDeposits: false,

                    walletButtonEnabled: false,
                    bankButtonEnabled: false,
                    withdrawalButtonEnabled: true,
                    depositsButtonEnabled: false,

                }); break;

            case "deposits":
                this.setState({
                    loadBankDetails: false,
                    loadMyWallet: false,
                    loadWithdrawals: false,
                    loadDeposits: true,

                    walletButtonEnabled: false,
                    bankButtonEnabled: false,
                    withdrawalButtonEnabled: false,
                    depositsButtonEnabled: true,

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
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" id="accounts" name="accounts" onClick={e => this.onShow(e)} disabled={this.state.bankButtonEnabled} > <Ionicon icon="ios-cash" /> Accounts </button>
                    </div>                    
                    <div className="col-md-3">                    
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="wallet" onClick={e => this.onShow(e)} disabled={this.state.walletButtonEnabled}> <Ionicon icon="ios-card" /> Wallet</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="withdrawals" onClick={e => this.onShow(e)} disabled={this.state.withdrawalButtonEnabled}> <Ionicon icon="ios-basket" /> Withdrawals</button>
                    </div>
                    <div className="col-md-3">                    
                        <button className="btn btn-app btn-flat btn-outline-dark btn-block" name="deposits" onClick={e => this.onShow(e)} disabled={this.state.depositsButtonEnabled}> <Ionicon icon="ios-battery-charging" /> Deposits</button>                    
                    </div>
                </div>

                <div className="row">
                {
                        (this.state.loadBankDetails) ? 
                        <BankDetails 
                            Bank_Details={this.state.Bank_Details} 
                            /> : ""
                }
                {
                        (this.state.loadMyWallet) ? 
                        <MyWallet 
                            Wallet={this.state.Wallet} 
                        /> : ""
                }

                {
                        (this.state.loadWithdrawals) ? 
                            <MyWithDrawals 
                                Wallet={this.state.Wallet}
                                Withdrawals_List={this.state.Withdrawals_List} 
                            /> : ""
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