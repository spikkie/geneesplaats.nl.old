import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
    Container,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    FormFeedback,
    FormText,
    Label,
    Input,
    Spinner,
    CustomInput
} from "reactstrap";

import classes from "./Activation.css";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

class Activation extends Component {
    constructor(props) {
        super(props);
        console.log("[Activation] constructor");
        console.log("[Activation] %0 ", this.props);
        const { uid } = props.match.params;
        const { token } = props.match.params;
        this.state = {
            uid: uid,
            token: token
        };
    }

    // static getDerivedStateFromProps(props, prevState) {}

    componentDidMount() {
        this.props.onActivation(this.state.uid, this.state.token);
    }

    render() {
        return <Redirect to="/auth/login" />;
        // return <h1>Authenticated user {this.state.uid}</h1>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onActivation: (uid, token) => dispatch(actions.activation(uid, token))
    };
};

export default connect(null, mapDispatchToProps)(Activation);
