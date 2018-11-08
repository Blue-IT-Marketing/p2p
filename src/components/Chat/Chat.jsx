
import React from "react";
import ChatMenu from "./ChatMenu/ChatMenu";
import "./Chat.css";
import Intro from "../Intro/Intro";
import * as app_constants from '../../constants/program_constants';

const Chat = props => {
    return (
        <div className="chat">
            <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />
            <div className="row">
                <div className="col-md-3">
                    <ChatMenu />
                </div>
                <div className="col-md-9">
                </div>
            
            </div>

        </div>
    )
}


export default Chat