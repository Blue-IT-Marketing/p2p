import React from 'react';

import "./SideDrawer.css";
import MenuItems from "../MenuItems/MenuItems";

const SideDrawer = props => {
    let drawerClasses = 'side_drawer';

    if (props.show){
        drawerClasses = 'side_drawer show';
    };

     
    return (
    <nav className={drawerClasses}>
        <MenuItems />
    </nav>);
};

export default SideDrawer;