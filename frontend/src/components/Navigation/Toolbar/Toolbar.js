import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import TopNav from "../../TopNav/TopNav";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
    <header className={classes.Toolbar}>
        {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
        {/* <div className={classes.Logo}> */}
        {/*     <Logo /> */}
        {/* </div> */}
        {/* <nav className={classes.DesktopOnly}> */}
        {/*     <NavigationItems isAuthenticated={props.isAuth} /> */}
        {/* </nav> */}
        <TopNav isAuthenticated={props.isAuth} />
    </header>
);

export default toolbar;
