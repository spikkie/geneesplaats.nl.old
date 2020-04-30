import React, { Component } from "react";
import { connect } from "react-redux";
import ReactNotifications from "react-notifications-component";

import Aux from "../Aux/Aux";
import classes from "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
// import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <ReactNotifications />
                <Toolbar isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    console.log("%0", state.auth.token);
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
