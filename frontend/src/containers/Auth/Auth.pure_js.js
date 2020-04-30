import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.scss";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

class Auth extends Component {
    constructor(props) {
        super(props);
        console.log("[Auth] ", this.props);
    }

    state = {
        controls: null,
        isSignup: null,
        loginSelected: null,
        signupSelected: null,
        signupRedirect: false
    };

    static getDerivedStateFromProps(props, prevState) {
        // console.log("getDerivedStateFromProps");
        // console.log(props);
        // console.log(prevState);
        // console.log(
        //     "-------------",
        //     prevState.loginSelected,
        //     props.location.state.login
        // );

        if (
            prevState.loginSelected === null ||
            props.location.state.login !== prevState.loginSelected
        ) {
            if (props.location.state.login) {
                console.log("[Auth] login login login");
                return {
                    controls: {
                        email: {
                            elementType: "input",
                            elementConfig: {
                                type: "email",
                                placeholder: "Mail Address",
                                key: "email"
                            },
                            value: "",
                            validation: {
                                required: true,
                                isEmail: true
                            },
                            valid: false,
                            touched: false
                        },
                        password: {
                            elementType: "input",
                            elementConfig: {
                                type: "password",
                                placeholder: "Password",
                                key: "password"
                            },
                            value: "",
                            validation: {
                                required: true,
                                minLength: 6
                            },
                            valid: false,
                            touched: false
                        }
                    },
                    isSignup: false,
                    loginSelected: props.location.state.login,
                    signupSelected: props.location.state.signup,
                    signupRedirect: false
                };
            } else if (props.location.state.signup) {
                return {
                    controls: {
                        name: {
                            elementType: "input",
                            elementConfig: {
                                type: "name",
                                placeholder: "name",
                                key: "name"
                            },
                            value: "",
                            validation: {
                                required: true,
                                isName: true,
                                minLength: 3
                            },
                            valid: false,
                            touched: false
                        },
                        email: {
                            elementType: "input",
                            elementConfig: {
                                type: "email",
                                placeholder: "Mail Address",
                                key: "email"
                            },
                            value: "",
                            validation: {
                                required: true,
                                isEmail: true
                            },
                            valid: false,
                            touched: false
                        },
                        password: {
                            elementType: "input",
                            elementConfig: {
                                type: "password",
                                placeholder: "Password",
                                key: "password"
                            },
                            value: "",
                            validation: {
                                required: true,
                                minLength: 6
                            },
                            valid: false,
                            touched: false
                        },
                        password2: {
                            elementType: "input",
                            elementConfig: {
                                type: "password",
                                placeholder: "Password",
                                key: "password2"
                            },
                            value: "",
                            validation: {
                                required: true,
                                minLength: 6
                            },
                            valid: false,
                            touched: false
                        }
                    },
                    isSignup: true,
                    loginSelected: props.location.state.login,
                    signupSelected: props.location.state.signup,
                    signupRedirect: false
                };
            }
        } else {
            return null;
        }
    }

    componentDidMount() {
        console.log(
            "[Auth] componentDidMount componentDidMount componentDidMount %0 ",
            this.state
        );
        // if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        if (this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
        if (this.props.signupRedirectPath !== "/") {
            console.log(
                "[Auth] this.props.signupRedirectPath check !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            );
            this.props.onSetSignupRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isName) {
            const pattern = /^[a-zA-Z-]+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = event => {
        event.preventDefault();
        if (this.state.isSignup) {
            this.props.onSignup(
                this.state.controls.name.value,
                this.state.controls.email.value,
                this.state.controls.password.value,
                this.state.controls.password2.value
            );
        } else {
            this.props.onAuth(
                this.state.controls.email.value,
                this.state.controls.password.value
            );
        }
    };

    // switchAuthModeHandler = () => {
    //     this.setState(prevState => {
    //         return { isSignup: !prevState.isSignup };
    //     });
    // };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log("%0", this.state);
            console.log("%0", this.props);
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        let signupRedirect = null;
        if (this.props.isSignedup && this.props.isSetRedirectAfterSignedup) {
            signupRedirect = <Redirect to={this.props.signupRedirectPath} />;
            this.props.onResetRedirectAfterSignedup();
        }

        if (this.props.location.state.login) {
            console.log("[Auth] logged_in ", this.props.location.state.login);
        } else if (this.props.location.state.signup) {
            console.log("[Auth] signup ", this.props.location.state.signup);
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {signupRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
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
        onSignup: (name, email, password, password2) =>
            dispatch(actions.signup(name, email, password, password2)),
        onSetAuthRedirectPath: () =>
            dispatch(actions.setAuthRedirectPath("/")),
        onSetSignupRedirectPath: () =>
            dispatch(actions.setSignupRedirectPath("/")),
        onSetRedirectAfterSignedup: () =>
            dispatch(actions.setRedirectAfterSignedup()),
        onResetRedirectAfterSignedup: () =>
            dispatch(actions.resetRedirectAfterSignedup())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Auth, axios));
// )(Auth);
