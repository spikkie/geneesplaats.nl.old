import React, { Component } from "react";
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
    Input
} from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            validate: {
                emailState: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = async event => {
        const { target } = event;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value
        });
    };

    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`);
    }

    handleLogin = e => {
        e.preventDefault();

        let data = this.state;
        console.log("1111");
        console.log(JSON.stringify(data));
        fetch("http://127.0.0.1:8001/api/v1/token/", {
            crossDomain: true,
            withCredentials: true,
            async: true,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem("token", json.token);
                // this.setState({
                //     logged_in: true,
                //     email: json.user.email
                // });
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({
            displayed_form: ""
        });
    };

    handleLoginChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        this.setState({ logged_in: false, email: "" });
    };

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    render() {
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={e => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                value={this.email}
                                valid={
                                    this.state.validate.emailState ===
                                    "has-success"
                                }
                                invalid={
                                    this.state.validate.emailState ===
                                    "has-danger"
                                }
                                onChange={e => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your
                                email. Please input a correct email.
                            </FormFeedback>
                            <FormText>
                                Your username is most likely your email.
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={this.password}
                                onChange={e => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button onClick={this.handleLogin}>Submit</Button>
                </Form>
            </Container>
        );
    }
    // return (
    //     <div>
    //         <form
    //             className="login-form"
    //             onSubmit={e =>
    //                 this.props.handleLogin(e, {
    //                     email: this.props.email,
    //                     password: this.state.password
    //                 })
    //             }
    //         >
    //             <Row>
    //                 <label htmlFor="email">email</label>
    //                 <input
    //                     type="text"
    //                     onChange={this.props.handleLoginChange}
    //                     value={this.props.email}
    //                     name="email"
    //                     id="email"
    //                     placeholder="email"
    //                 />
    //             </Row>
    //             <Row>
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                     type="password"
    //                     onChange={this.handlePasswordChange}
    //                     value={this.state.password}
    //                     name="password"
    //                     id="password"
    //                     placeholder="Password"
    //                 />
    //             </Row>
    //             <button
    //                 className="btn-lg btn-dark btn-block"
    //                 type="submit"
    //             >
    //                 Login
    //             </button>
    //         </form>
    //     </div>
    // );
}

export default Login;

// import React, { Component } from 'react'
// import LoginUser from './Accounts/LoginUser';
// import RegisterUser from './Accounts/RegisterUser';

// class NavComponent extends Component {
//     render(){
//         let form;
//         switch(this.props.displayed_form){
//             case 'login' :
//                 form = <LoginUser
//                         handleLmginChange={this.props.handleLoginChange}
//                         handleLogin={this.props.handleLogin}
//                         email={this.props.email}/>;
//                 break;
//             case 'signup' :
//                 form = <RegisterUser />
//                 break;
//             default:
//                 form = null;
//             }
//         const logged_in_nav = (
//             <ul>
//                 <li onClick = {() => this.props.display_form('login')}>Login</li>
//                 <li onClick = {() => this.props.display_form('signup')}>Signup</li>
//             </ul>
//         );
//         const logged_out_nav = (
//             <ul>
//                 <li onClick={this.props.handleLogout}>Logout</li>
//             </ul>
//         );
//         return (
//             <div>
//                 {this.props.logged_in? logged_out_nav : logged_in_nav}
//                 {form}
//             </div>
//         );
//     }
// }
// export default NavComponent
