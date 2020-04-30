import React, { Component } from "react";
import "./App.scss";

// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home";

import DebugData from "./components/DebugData";
import Test1 from "./components/Test1/Test1";

import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Activation from "./containers/Auth/Activation/Activation";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

// Styling / css
import "./styles/stylesheet.scss";

class App extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         ideaData: null
    //     };
    // }

    componentDidMount() {
        console.log(
            "process.env.REACT_APP_TEST %0",
            process.env.REACT_APP_TEST
        );
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route
                    path="/auth/activation/:uid/:token"
                    exact
                    component={Activation}
                />
                <Route path="/auth/:signup_login" exact component={Auth} />
                <Route path="/" exact component={Home} />

                <Route path="/test1" exact component={Test1} />

                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/auth/checkout" component={Checkout} />
                    <Route path="/auth/logout" component={Logout} />

                    <Route path="/debugdata" component={DebugData} />
                    <Route path="/test1" exact component={Test1} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}
// }

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//export default App;
