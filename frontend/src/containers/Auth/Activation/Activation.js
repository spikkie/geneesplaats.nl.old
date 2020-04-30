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

import classes from "./Activation.scss";
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
        if (!this.props.activated) {
            this.props.onActivation(this.state.uid, this.state.token);
        }
    }

    render() {
        console.log("[Activation] Render");
        console.log("[Activation] this.props %0", this.props);

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let content = null;
        if (this.props.loading) {
            content = <Spinner animaoion="border" />;
        } else if (this.props.error) {
            content = (
                <div>
                    {errorMessage}
                    <h3>Activatie van account niet gelukt</h3>
                </div>
            );
        } else if (this.props.isActivated) {
            content = (
                <Redirect
                    to={{
                        pathname: "/auth/login",
                        state: { redirectedFromActivation: "true" }
                    }}
                />
            );
        } else {
            content = (
                <div>
                    {errorMessage}
                    <h3>Activatie van account niet gelukt</h3>
                </div>
            );
        }
        return <Container className="App">{content}</Container>;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.activation.loading,
        error: state.activation.error,
        isActivated: state.activation.activated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onActivation: (uid, token) => dispatch(actions.activation(uid, token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Activation, axios));
// )(Activation);
