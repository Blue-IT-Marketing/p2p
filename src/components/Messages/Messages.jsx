import React, { Component } from 'react';
import './Messages.css';
import Axios from 'axios';
import {
    firebase, auth
} from '../../firebase';
import SignInPage from '../User/SignIn/SignIn';

let message_details = {
    toReference : "",
    fromReference : "",
    messageIndex : "",
    messageType : "",
    subject: "",
    message: "",
    dateTimeSent : "",
    dateTimeRead: ""
};

// linkto = { message.messageIndex }
// onClick = { this.showMessage.bind(this) }




const MessageListItem = props => {
    return (
        <tr>
            <td><span name={props.linkto} onClick={e => {
                let linkTo = props.linkto;
                return (
                    props.onShowMessage(linkTo)
                )
            }} style={{ cursor: "pointer", colour: "blue" }} className="blue-active"><strong>{props.messageType}</strong></span> </td>
            <td><span name={props.linkto} onClick={e => {
                let linkTo = props.linkto;
                return(
                    props.onShowMessage(linkTo)
                )
            }} style={{ cursor: "pointer", colour: "blue" }} className="blue-active"><strong>{props.subject}</strong></span></td>        
            <td>{props.dateTimeSent}</td>
        </tr>
    )
}

class ShowMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            Message : ""
        }
    }

    componentWillMount(e){
        
        this.props.MessageDidShow(e);
        this.setState({
            Message: this.props.Message
        })
    }

    render(){
        return (
            <div className="message-inbox">
                <h3>{this.state.Message.subject}</h3>

                <div className="box box-footer">
                    {this.state.Message.message}
                </div>
                <div className="box-footer">
                    <button type="button" className="btn btn-app"><strong>Close</strong></button>
                </div>
            </div>

        )
    }


}

class showMessagesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            Messages_List : []
        }
    }

    componentWillMount(e){
        this.setState=({
            Messages_List : this.props.Messages_List
        })
    }

    render(){
        return (
            <div className="panel-body">
                <div className="box box-header">
                    <h3 className="box-title"> <span className="glyphicon glyphicon-user"> </span> Messages </h3>
                </div>

                <table className="table table-responsive table-borderless table-striped">
                    <thead>
                        <tr>
                            <td><strong>Type</strong></td>
                            <td><strong>Subject</strong></td>
                            <td><strong>Date Sent</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Messages_List.map((message, index) => {
                                return (
                                    <MessageListItem
                                        key={message.messageIndex}
                                        messageType={message.messageType}
                                        subject={message.subject}
                                        dateTimeSent={message.dateTimeSent}
                                        linkto={message.messageIndex}
                                        onShowMessage={this.showMessage.bind(this)}
                                    />
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Type</strong></td>
                            <td><strong>Subject</strong></td>
                            <td><strong>Date Sent</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        )
    }
}




class Messages extends Component{
    constructor(){
        super();
        this.state = {
            present_Message : {...message_details},
            Messages_List : [{
                toReference: "fsdfsd8798h",
                fromReference: "65465g454",
                messageIndex: "34r",
                messageType: "message",
                subject: "This is a test",
                message: "Basic test message to test the functionality of our messaging utility",
                dateTimeSent: "2013-04-04",
                dateTimeRead: "2013-04-04"                
            }],

            doShowMessage : false,

        };
    };


    showMessage(ref){
        console.log(ref);
        let messages_list = Object.assign([],this.state.Messages_List);

        let present_Message = messages_list.find(message => message.messageIndex === ref);

        this.setState({
            present_Message : present_Message,
            doShowMessage : true
        });
    }

    MessageShowed(e){
        this.setState({
            doShowMessage : false
        })
    }

    componentWillMount(e){
        this.setState({
            doShowMessage: false
        })

    }


    render(){
        let isUserLoggedIn = ((firebase.auth.currentUser !== "") && (firebase.auth.currentUser !== null));

        if (isUserLoggedIn) {

            return(            
                (this.state.doShowMessage === true) ? <ShowMessage MessageDidShow={this.MessageShowed.bind(this)} Message={this.state.present_Message} />:                    
                    <showMessagesList Messages_List={this.state.Messages_List} />
                )
        }
        else{
            return (<SignInPage message={"Please sign in before using the messaging module"}/>)
        }
    }

}



export default Messages;