import React, { Component } from 'react';
import './Messages.css';
import Axios from 'axios';
import {
    firebase, auth
} from '../../firebase';
import SignInPage from '../User/SignIn/SignIn';
import Ionicon from 'react-ionicons';

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
            }} style={{ cursor: "pointer", colour: "blue" }} className="blue"><strong>{props.messageType}</strong></span> </td>
            <td><span name={props.linkto} onClick={e => {
                let linkTo = props.linkto;
                return(
                    props.onShowMessage(linkTo)
                )
            }} style={{ cursor: "pointer", colour: "blue" }} className="blue-active"><em>{props.subject}</em></span></td>        
            <td>{props.dateTimeSent}</td>
        </tr>
    )
}

class ShowMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            Message : {...message_details},
            Reply : {...message_details},
            doShowReply : false,
            form_response : ""
        }

        this.onClose = this.onClose.bind(this);
        this.onReply = this.onReply.bind(this);
        this.doReply = this.doReply.bind(this);
        this.doCancel = this.doCancel.bind(this);

    }

    onClose(e){
        this.props.MessageDidShow(e);        
    }

    onReply(e){
        this.setState({
            doShowReply : true
        })
    }

    doReply(e){
        let ReplyMessage = Object.assign({},this.state.Reply);
        ReplyMessage = JSON.stringify(ReplyMessage);
        console.log(ReplyMessage);
        let messages_reply_url = '/messages/'+this.state.Message.messageIndex + "/reply";
        let response_message = "";
        Axios.post(messages_reply_url,"&data="+ReplyMessage).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error("Error sending response");
            }
        }).then(function(data){
            response_message = JSON.parse(data);


        }).catch(function(err){
            response_message = err;
        });

        this.setState({
            form_response: response_message.message
        });
    }

    onReplyChange(e){
        let reply = Object.assign({},this.state.Reply);
        let message = Object.assign({},this.state.Message);

        reply.toReference = message.fromReference;
        reply.fromReference = message.toReference;
        reply.message = e.target.value; 
        this.setState({
            Reply : reply
        })       
        // this.state.Reply = reply;
        // this.forceUpdate();
        console.log(this.state.Reply)
    }

    doCancel(e){
        this.setState({
            Reply : {...message_details},
            doShowReply: true
        })
    }

    componentWillMount(e){                
        this.setState({
            Message: this.props.Message
        })
    }

    render(){
        return (
            <div className="message-inbox">
            <div className="box box-header">
                    <h3 className="box-title"> <Ionicon icon="ios-folder" fontSize="20px" /> Message Reader</h3>
            </div>
                <div className="box box-header">
                    <h3 className="box-title">{this.state.Message.subject}</h3>
                </div>
                <div className="box box-footer">
                    <textarea className="form-control" name="message" value={this.state.Message.message} readOnly={true}></textarea>
                </div>
                {
                    (this.state.doShowReply) ? 
                    <div className="box box-footer">
                        <div className="form-group">
                            <label>Reply : </label>
                            <div className="input-group">
                                <textarea className="form-control" name="reply" value={this.state.Reply.Message} onChange={e => this.onReplyChange(e)}></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-app btn-block btn-outline-info" name="doReply" onClick={e => this.doReply(e)}><strong> <Ionicon icon="ios-send" fontSize="20px"> </Ionicon> Send</strong></button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-app btn-block btn-outline-danger" name="doCancel" onClick={e => this.doCancel(e)}><strong>Cancel</strong></button>
                                </div>
                            </div>
                        </div>
                    </div> 

                    : 
                    ""
                }
                
                {
                    (this.state.form_response !== "") ?
                    <div className="box-footer">
                        {this.state.form_response}
                    </div>
                    : ""
                }

                <div className="box-footer">
                    <div className="row">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-app btn-outline-dark btn-block" onClick={e => this.onClose(e)}><strong>Close</strong></button>
                        </div>
                        <div className="col-md-4">
                                <button type="button" className="btn btn-app btn-outline-info btn-block" onClick={e => this.onReply(e)}><strong>Reply</strong></button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-app btn-outline-danger btn-block" onClick={e => {
                                let delKey = this.state.Message.messageIndex;
                                return(
                                    this.props.onDeleteMessage(delKey)
                                )

                            }}><strong>Delete</strong></button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

class ShowMessagesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            Messages_List :[],
        }
    }

    componentWillMount(e){
        let Messages_List = Object.assign([],this.state.Messages_List);
        Messages_List = this.props.Messages_List;
        this.state.Messages_List = Messages_List
        this.forceUpdate();
    }

    render(){
        return (
            <div className="panel-body">
                <div className="box box-header">
                    <h3 className="box-title"> <span className="glyphicon glyphicon-user"> </span> Messages InBox </h3>
                    <button type="button" className="btn btn-app btn-dark btn-box-tool pull-right" name="compose" onClick={e => this.props.onCompose(e)}><strong>Compose</strong></button>
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
                                        onShowMessage={this.props.showMessage}
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


class Compose extends Component{
    constructor(props){
        super(props);
        this.state = {
            Message :{...message_details}
        }
    }

    render(){
        return(
            <div className="box box-box-comments">
                <div className="box box-header">
                    <h3 className="box-title">Message Composer</h3>
                    <button type="button" className="btn btn-app btn-outline-dark pull-right" onClick={ e => this.props.doShowInBox(e)}> <strong>InBox</strong></button>
                </div>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label>To: </label>
                        <div className="input-group">
                            <select name="to" className="form-control">
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="subject" value={this.state.Message.subject} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <div className="input-group">
                            <textarea name="message" className="form-control" value={this.state.Message.message}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" className="btn btn-app btn-outline-success" name="send"><strong>Send Message</strong></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class Messages extends Component{
    constructor(){
        super();
        this.state = {
            present_Message : {...message_details},
            Messages_List : [],
            doShowMessage : false,
            doShowCompose : false,
            doShowInBox : true,
            form_response : ""

        };
    };


    showMessage(ref){
        console.log(ref);
        let messages_list = Object.assign([],this.state.Messages_List);

        let present_Message = messages_list.find(message => message.messageIndex === ref);

        this.setState({
            present_Message : present_Message,
            doShowMessage : true,
            doShowCompose: false,
            doShowInBox: false,
        });
    }

    deleteMessage(delKey){
        let messages_list = Object.assign([], this.state.Messages_List);

        let index = messages_list.findIndex(message => message.messageIndex === delKey);
        console.log(delKey)
        console.log(index);        
        this.state.messages_list = messages_list.splice(index, 1);
        let e = new Event("close");
        this.MessageShowed(e);

        //updating back end

        let messages_url = '/messages/' + delKey + "/delete";
        let message = "";

        Axios.get(messages_url).then(function(response){
            if (response.status === 200){
                return response.data;
            }else{
                throw new Error("Error deleting message");
            }
        }).then(function(data){
            data = JSON.parse(data);
            message = data.message
        }).catch(function(err){
            message = err.message;
        });
        
        this.setState({
            form_response : message
        })

        this.forceUpdate();
    }

    MessageShowed(e){
        this.setState({
            doShowMessage : false,
            doShowCompose: false,
            doShowInBox: true,
        })
    }


    onCompose(e){
        this.setState({
            doShowMessage: false,
            doShowCompose: true,
            doShowInBox: false,
        })
    }

    onShowInBox(e){
        this.setState({
            doShowMessage: false,
            doShowCompose: false,
            doShowInBox: true,

        })
    }

    componentWillMount(e){
        this.setState({
            doShowMessage: false,

            //load messages from backend
            Messages_List: [{
                toReference: "fsdfsd8798h",
                fromReference: "65465g454",
                messageIndex: "34r",
                messageType: "message",
                subject: "This is a test",
                message: "Basic test message to test the functionality of our messaging utility",
                dateTimeSent: "2013-04-04",
                dateTimeRead: "2013-04-04"
            },{
                toReference: "fsdf66sd8798h",
                fromReference: "665465g454",
                messageIndex: "35r",
                messageType: "message",
                subject: "This is a second test",
                message: "Basic test message to test the functionality of our messaging utility",
                dateTimeSent: "2013-05-04",
                dateTimeRead: "2013-05-04"

            }]

        })

    }


    render(){
        let isUserLoggedIn = ((firebase.auth.currentUser !== "") && (firebase.auth.currentUser !== null));

        if (isUserLoggedIn) {
            console.log("User is logged in");

            if (this.state.doShowMessage === true){
                console.log("Showing Message");
                return (<ShowMessage MessageDidShow={this.MessageShowed.bind(this)} Message={this.state.present_Message} onDeleteMessage={this.deleteMessage.bind(this)} />)
            }
            if (this.state.doShowInBox === true){
                console.log("Showing Messages List");
                return (<ShowMessagesList 
                    Messages_List={this.state.Messages_List} 
                    showMessage={this.showMessage.bind(this)} onCompose={this.onCompose.bind(this)} />)
            }

            if (this.state.doShowCompose === true){
                console.log("show compose");
                return (<Compose doShowInBox={this.onShowInBox.bind(this)} />)
            }
        }
        else{
            return (<SignInPage message={"Please sign in before using the messaging module"}/>)
        }
    }

}



export default Messages;