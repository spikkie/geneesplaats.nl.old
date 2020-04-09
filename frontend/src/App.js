import React, { Component } from "react";
import "./App.css";

import Axios from "./axios.gp";
// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import TopNav from "./components/TopNav";
import Home from "./components/Home";

import DebugData from "./components/DebugData";

import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         ideaData: null
    //     };
    // }

    componentDidMount() {
        // Axios.get("http://127.0.0.1:8001/api/v1/idea/idea/")
        //     .then(response => {
        //         console.log(response);
        //         this.setState({ ideaData: response.data });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" exact component={Auth} />
                <Route path="/signup" exact component={Auth} />
                <Route path="/" exact component={Home} />
                {/* <Route path="/" exact component={BurgerBuilder} /> */}
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/debugdata" component={DebugData} />
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
