
import React from "react";

import "./Intro.css";


const Intro = props => {
    return (
        <div>
            <div className="box box-header">
                
                <h1 className="box-title"> <i className="glyphicon glyphicon-grain"> </i> 
                    { props.heading } </h1>
                <blockquote>
                    <small><strong>{props.slogan}</strong></small>
                </blockquote>
            </div>

        </div>
    )
}

export default Intro