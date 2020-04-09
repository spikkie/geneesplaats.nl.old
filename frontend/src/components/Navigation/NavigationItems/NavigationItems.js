import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/" exact> */}
        {/*     Home */}
        {/* </NavigationItem> */}
        {/* {props.isAuthenticated ? ( */}
        {/*     <NavigationItem link="/login">login</NavigationItem> */}
        {/* ) : null} */}
        {!props.isAuthenticated ? (
            <NavigationItem link="/login">Login</NavigationItem>
        ) : (
            <NavigationItem link="/logout">Logout</NavigationItem>
        )}
    </ul>
);

export default navigationItems;
