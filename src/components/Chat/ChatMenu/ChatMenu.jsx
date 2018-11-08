
import React from "react";
import { Link } from "react-router-dom";
import "./ChatMenu.css";


const ChatMenu = props => {
    return (
        <div className="chat-menu">
            <div className="box box-primary">
                <div className="box box-header">
                    <h3 className="box box-title"> Chat Menu</h3>
                </div>
                <ul className="chat-menu-list">
                    <li><Link to="/chat/messages"> messages </Link></li>
                    <li><Link to="/chat/settings"> settings </Link></li>
                </ul>

            </div>

        </div>
    )
}


export default ChatMenu