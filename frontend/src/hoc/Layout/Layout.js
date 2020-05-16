import React, { Component } from "react";
import { connect } from "react-redux";
import ReactNotifications from "react-notifications-component";

import Aux from "../Aux/Aux";
import classes from "./Layout.scss";
import TopNav from "../../components/TopNav/TopNav";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <ReactNotifications />
                <TopNav isAuthenticated={this.props.isAuthenticated} />
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
