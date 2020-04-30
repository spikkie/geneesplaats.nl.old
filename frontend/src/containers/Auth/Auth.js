import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

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

import classes from "./Auth.scss";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import customNotification from "../../helpers/customNotification";
import axios from "axios";

class Auth extends Component {
    constructor(props) {
        super(props);
        console.log("[Auth] ", this.props);

        this.handleChange = this.handleChange.bind(this);
    }

    state = {};

    static getDerivedStateFromProps(props, prevState) {
        console.log("[Auth] getDerivedStateFromProps props, %0", props);
        console.log("[Auth] getDerivedStateFromProps prevState %0", prevState);
        const { signup_login } = props.match.params;
        console.log(
            "[Auth] getDerivedStateFromProps this.props.match.params signup_login %0 ",
            signup_login
        );

        if (prevState === null || signup_login !== prevState.url) {
            if (signup_login === "login") {
                console.log("[Auth] login login login");
                return {
                    email: "",
                    password: "",
                    validate: {
                        emailState: ""
                    },
                    url: signup_login,
                    isSignup: false,
                    signupRedirect: false,
                    radioTzGk: "is_tz"
                };
            } else if (signup_login === "signup") {
                console.log("[Auth] signup signup signup");
                return {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    validate: {
                        emailState: "",
                        nameState: ""
                    },
                    url: signup_login,
                    isSignup: true,
                    signupRedirect: false
                };
            } else {
                console.log("[Auth] Error getDerivedStateFromProps");
                return prevState;
            }
        } else {
            console.log(
                "[Auth] getDerivedStateFromProps no url  change, return url  %0 "
            );
            return null;
        }
    }

    showStandardNotification(msg) {
        console.log("[Auth][showStandardNotification] msg ", msg);
        store.addNotification({
            title: "",
            message: msg,
            type: "info", // 'default', 'success', 'info', 'warning'
            container: "bottom-left", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
                touch: true,
                click: true,
                duration: 30000,
                onScree: true,
                pauseOnHover: true
            }
        });
    }

    showNotification() {
        store.addNotification({
            title: this.props.error.notification.dutchTitle,
            message: this.props.error.notification.dutchMessage,
            // type: "success", // 'default', 'success', 'info', 'warning'
            type: this.props.error.notification.type,
            // container: "bottom-left", // where to position the notifications
            // container: "center", // where to position the notifications
            container: this.props.error.notification.container,
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
                touch: true,
                click: true,
                duration: 3000000,
                onScree: true,
                pauseOnHover: true
            },
            onRemoval: () => {
                console.log("[Auth] store.addNotification onRemoval");
                this.props.onAuthResetNotifiedError();
                this.props.onAuthResetMessage();
            }
        });
    }

    componentDidMount() {
        console.log("[Auth] componentDidMount this %0 ", this);
        console.log("[Auth] componentDidMount state %0 ", this.state);
        console.log("[Auth] componentDidMount props %0 ", this.props);

        if (this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
        if (this.props.signupRedirectPath !== "/") {
            this.props.onSetSignupRedirectPath();
        }

        const { signup_login } = this.props.match.params;
        console.log(
            "[Auth] componentDidMount this.props.match.params signup_login %0 ",
            signup_login
        );

        // popup message that Activation was succesful
        if (
            this.props.location.state &&
            this.props.location.state.redirectedFromActivation === "true"
        ) {
            console.log(
                "[Auth] redirectedFromActivation redirectedFromActivation redirectedFromActivation"
            );
            this.showStandardNotification("Account is nu geactiveerd");
        }
    }

    componentDidUpdate() {
        console.log("[Auth] componentDidUpdate props %0 ", this.props);
        if (
            this.props.error &&
            (this.props.error.notification.type === "warning" ||
                this.props.error.notification.type === "success") &&
            !this.props.notifiedMessage
        ) {
            this.props.onAuthSetNotifiedError();
            Notification = this.showNotification();
        }
    }

    componentWillUnmount() {
        if (this.props.isSignedup && this.props.isSetRedirectAfterSignedup) {
            this.props.onResetRedirectAfterSignedup();
        }
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = "has-success";
        } else {
            validate.emailState = "has-danger";
        }
        this.setState({ validate });
    }

    ttom;
    validateName(e) {
        const nameRex = /^([a-zA-Z0-9-])*$/;
        const { validate } = this.state;
        if (nameRex.test(e.target.value)) {
            validate.nameState = "has-success";
        } else {
            validate.nameState = "has-danger";
        }
        this.setState({ validate });
    }

    handleChange = async event => {
        console.log("[Auth] handleChange %0 ", event);
        console.log("[Auth] handleChange event.target %0 ", event.target);
        console.log("[Auth] handleChange state %0 ", this.state);
        const { target } = event;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        console.log("[Auth] target %s");
        console.log("[Auth] name", name);
        console.log("[Auth] target", value);

        if (event.target.type === "radio") {
            await this.setState({
                radioTzGk: value
            });
        } else {
            await this.setState({
                [name]: value
            });
        }
    };

    submitForm(e) {
        e.preventDefault();
        console.log(`[Auth] Email: ${this.state.email}`);
    }

    handleLogin = e => {
        e.preventDefault();
        console.log("[Auth] 88888888 %0", e);
        console.log("[Auth] state %0", this.state);
        if (this.state.isSignup) {
            let is_gk = false;
            let is_tz = false;

            if (this.state.radioTzGk === "is_tz") {
                is_tz = true;
            } else if (this.state.radioTzGk === "is_gk") {
                is_gk = true;
            } else {
                console.log("[Auth] error");
            }
            this.props.onSignup(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.confirmPassword,
                is_gk,
                is_tz
            );
        } else {
            this.props.onAuth(this.state.email, this.state.password);
        }
    };

    render() {
        console.log(
            "[Auth] ------------------- RENDERING  -----------------------------"
        );
        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner animaoion="border" />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.notification.dutchMessage}</p>;
        } else {
            errorMessage = <p>No Error Message</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        let signupRedirect = null;
        if (this.props.isSignedup && this.props.isSetRedirectAfterSignedup) {
            signupRedirect = <Redirect to={this.props.signupRedirectPath} />;
        }

        let signupFormGkTzInput = (
            <Col key="RadioButtonGkTz">
                <FormGroup tag="fieldset">
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="tzOrGk"
                                value="is_tz"
                                checked={this.state.radioTzGk === "is_tz"}
                                // checked={true}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />{" "}
                            als Therapie Zoekende
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="tzOrGk"
                                value="is_gk"
                                checked={this.state.radioTzGk === "is_gk"}
                                onChange={e => {
                                    this.handleChange(e);
                                }}
                            />{" "}
                            als Geneeskundige
                        </Label>
                    </FormGroup>
                    <legend>
                        {/* Kies aanmelden als Therapie Zoekende of Geneeskundige */}
                    </legend>
                </FormGroup>
            </Col>
        );

        let signupFormNameInput = (
            <Col key="1">
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        //plaintext
                        type="text"
                        name="name"
                        id="jouwNaam"
                        placeholder="jouw naam"
                        value={this.state.name}
                        valid={this.state.validate.nameState === "has-success"}
                        invalid={
                            this.state.validate.nameState === "has-danger"
                        }
                        onChange={e => {
                            this.validateName(e);
                            this.handleChange(e);
                        }}
                    />
                    <FormFeedback valid>Name is ok.</FormFeedback>
                    <FormFeedback>Please input a correct name.</FormFeedback>
                    {/* <FormText>Your username is most likely</FormText> */}
                </FormGroup>
            </Col>
        );

        let loginFormEmailInput = (
            <Col key="2">
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="email@email.com"
                        value={this.state.email}
                        valid={
                            this.state.validate.emailState === "has-success"
                        }
                        invalid={
                            this.state.validate.emailState === "has-danger"
                        }
                        onChange={e => {
                            this.validateEmail(e);
                            this.handleChange(e);
                        }}
                    />
                    {/* <FormFeedback valid>Email is ok.</FormFeedback> */}
                    <FormFeedback>Please input a correct email.</FormFeedback>
                    {/* <FormText> */}
                    {/*     Your username is most likely your email. */}
                    {/* </FormText> */}
                </FormGroup>
            </Col>
        );

        let loginFormPasswordInput = (
            <Col key="3">
                <FormGroup>
                    <Label for="Password">Wachtwoord</Label>
                    <Input
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="********"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
        );

        let loginFormConfirmPasswordInput = (
            <Col key="4">
                <FormGroup>
                    <Label for="confirmPassword">Bevestig Wachtwoord</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="ConfirmPassword"
                        placeholder="********"
                        value={this.state.confirmPassword}
                        onChange={e => this.handleChange(e)}
                    />
                </FormGroup>
            </Col>
        );

        let useForm = [];
        let headTitle = "";

        let button = "";
        if (this.state.url === "login") {
            headTitle = <h2>Inloggen</h2>;
            useForm.push(loginFormEmailInput);
            useForm.push(loginFormPasswordInput);
            button = <Button onClick={this.handleLogin}>Login</Button>;
        } else if (this.state.url === "signup") {
            headTitle = <h2>Aanmelden</h2>;
            useForm.push(signupFormGkTzInput);
            useForm.push(signupFormNameInput);
            useForm.push(loginFormEmailInput);
            useForm.push(loginFormPasswordInput);
            useForm.push(loginFormConfirmPasswordInput);
            button = <Button onClick={this.handleLogin}>Registreren</Button>;
        } else {
            console.log("[Auth] Error set signup or login");
        }

        return (
            <Container className="App">
                {errorMessage}
                {spinner}
                {headTitle}
                {authRedirect}
                {signupRedirect}

                {/* <Spinner animaoion="border" /> */}

                <Form className="form" onSubmit={this.handleSubmit}>
                    {useForm}
                    {button}
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        notifiedMessage: state.auth.notifiedMessage,
        isAuthenticated: state.auth.token !== null,
        isSignedup: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath,
        signupRedirectPath: state.auth.signupRedirectPath,
        isSetRedirectAfterSignedup: state.auth.redirectAfterSignedup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSignup: (name, email, password, confirmPassword, is_gk, is_tz) =>
            dispatch(
                actions.signup(
                    name,
                    email,
                    password,
                    confirmPassword,
                    is_gk,
                    is_tz
                )
            ),
        onSetAuthRedirectPath: () =>
            dispatch(actions.setAuthRedirectPath("/")),
        onSetSignupRedirectPath: () =>
            dispatch(actions.setSignupRedirectPath("/")),
        onSetRedirectAfterSignedup: () =>
            dispatch(actions.setRedirectAfterSignedup()),

        onResetRedirectAfterSignedup: () =>
            dispatch(actions.resetRedirectAfterSignedup()),

        onAuthResetMessage: () => dispatch(actions.authResetMessage()),

        onAuthSetNotifiedError: () => dispatch(actions.authSetNotifiedError()),
        onAuthResetNotifiedError: () =>
            dispatch(actions.authResetNotifiedError())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Auth, axios));
// )(Auth);
