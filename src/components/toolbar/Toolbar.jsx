import React from "react";
import "../SideDrawer/ToggleButton";
import './Toolbar.css';
import ToggleButton from "../SideDrawer/ToggleButton";
import MenuItems from "../MenuItems/MenuItems";
import * as app_constants from '../../constants/program_constants';

const Toolbar = props => (

    <header className="toolbar">
        <nav className="toolbar_nav">
            <div className="toolbar_toggle"> 
                <ToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar_logo"> <a href="/"> <strong>{app_constants.app_long_name}</strong></a></div>
            <div className="spacer"></div>
            <div className="toolbar_nav_items">
                <MenuItems props={props} />
            </div>
        </nav>
    </header>
);


export default Toolbar;