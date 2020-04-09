import React, { Component } from "react";
import Axios from "axios";
import { Row } from "reactstrap";
const required = val => val && val.length;
const minLength = (len, val) => !val || val.length < len;
const maxLength = (len, val) => val.length > len;
const isEqual = (p1, p2) => p1 === p2;

//const base_url = window.SERVER_ADDRESS
//const base_url = "http://localhost:8001/"
//const base_url = "http://django/"
//const base_url = "http://0.0.0.0:8001/"
//const base_url = "django"

class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            display_name: false,
            display_email: false,
            display_password: false,
            display_password2: false
        };
    }
    getErrors = (name, value) => {
        let errors = [];
        if (!required(value)) {
            errors.push("This value is required");
        }
        if (minLength(3, value)) {
            errors.push("Greater than 3 characters required");
        }
        if (maxLength(20, value)) {
            errors.push("Cannot be more than 25 characters");
        }
        if (name === "password2" && !isEqual(this.state.password, value)) {
            errors.push("Passwords should be the same");
        }
        const property = "display_" + name;

        if (errors.length === 0) {
            //    // this.setState({
            //    //     [property] : false
            //    // })
            //    todo
            // ./src/components/TopNav/NavComponent/Accounts/RegisterUser.js
            //   Line 52:13:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state
            this.state[property] = false;
            //    this.setState({
            //        [property]: false
            //    });
        }
        if (this.state[property]) {
            return (
                <>
                    {errors.map((error, index) => (
                        <Row key={index} style={{ color: "red" }}>
                            {error}
                        </Row>
                    ))}
                </>
            );
        }
    };
    isValid = () => {
        let valid = true;
        Object.values(this.state).forEach(val => {
            if (val === true) {
                valid = false;
                return valid;
            }
        });
        return valid;
    };

    clearForm = () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            password2: "",
            display_name: false,
            display_email: false,
            display_password: false,
            display_password2: false
        });
    };
    sendRegistration = e => {
        e.preventDefault();
        const { first_name, last_name, email, password } = this.state;
        if (this.isValid()) {
            Axios.post("http://127.0.0.1:8001/api/v1/auth/users/", {
                user: {
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                }
            })
                .then(response => {
                    console.log(response);
                    console.log(response.status + " " + response.statusText);
                })
                .catch(error => {
                    console.log(error);
                });
            this.clearForm();
        } else {
            // todo print this.state
            console.log("Not valid");
        }
    };

    changeHandler = event => {
        event.preventDefault();
        var stateObject = (function() {
            var returnObj = {};
            returnObj["display_" + event.target.name] = true;
            return returnObj;
        })();

        this.setState(stateObject);
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.sendRegistration} noValidate>
                    <div>
                        <label htmlFor="name"> name </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.changeHandler}
                        />
                        {this.getErrors("name", this.state.name)}
                    </div>
                    <div>
                        <label htmlFor="email"> email </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeHandler}
                        />
                        {this.getErrors("email", this.state.email)}
                    </div>
                    <div>
                        <label htmlFor="pass"> Password </label>
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                        />
                        {this.getErrors("password", this.state.password)}
                    </div>
                    <div>
                        <label htmlFor="pass2"> Password again </label>
                        <input
                            type="password"
                            id="pass2"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.changeHandler}
                        />
                        {this.getErrors("password2", this.state.password2)}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterUser;
