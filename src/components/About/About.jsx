
import React from "react";

import "./About.css";
import Intro from "../Intro/Intro";
import * as app_constants from '../../constants/program_constants';

const About = props => {
    return (
        <div className="about">    
        <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition}/>
            <div className="row">
                                    
                        <div className="col-lg-3">

                            <div className="box box-primary">
                                <div className="box box-header">
                                    <h3 className="box box-title">About</h3>
                                </div>
                            
                            
                            </div>

                        </div>
                        <div className="col-lg-9">
                        
                        </div>
                    
            </div>            
        </div>
    )
}


export default About