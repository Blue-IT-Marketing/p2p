import React  from 'react';
import './Home.css';
import Intro from '../Intro/Intro';
import * as app_constants from '../../constants/program_constants';


const Home = props => {
    return (
            <div className="home">                
            <Intro heading={app_constants.app_name} slogan={app_constants.app_descrition} />

                 <div className="row">
                        <div className="col-lg-3">
                            <div className="box box-primary">
                                <div className="box box-header">
                                    <h3 className="box-title"> Home </h3>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className="box box-body">
                                
                            </div>

                        </div>
                 </div>
                    
                
            </div>

        );
    
}

export default Home;
