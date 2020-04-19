import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./TopNav.css";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from "reactstrap";

import { Link } from "react-router-dom";

class TopNav extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            logged_in: this.props.isAuthenticated ? true : false,
            email: "",
            isOpen: false
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            console.log("logged in yet");
            fetch("/api/v1/auth/user/me/", {
                method: "GET",
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(resp => {
                    console.log("email ", resp.email);
                    this.setState({ email: resp.email });
                })
                .catch(err => console.log(err));
        } else {
            console.log("Not logged in yet");
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // display_form = formName => {
    //     this.setState({
    //         displayed_form: formName
    //     });
    // };

    render() {
        // const { logged_in, email } = this.state;
        // const IdeaSelections = this.props.ideaData.map(item => {
        //     return (
        //         <DropdownItem key={item.detailKey}>
        //             <Link to={{ pathname: "/detail/" + item.detailKey }}>
        //                 {item.model}
        //             </Link>
        //         </DropdownItem>
        //     );
        // }, this);
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">
                    Geneesplaats.nl
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">
                                <i className="fas fa-home"></i> Home
                            </NavLink>
                        </NavItem>
                        {/* <UncontrolledDropdown nav inNavbar> */}
                        {/*     <DropdownToggle nav caret> */}
                        {/*         <i className="fas fa-space-shuttle"></i> Flying */}
                        {/*         Cars */}
                        {/*     </DropdownToggle> */}
                        {/*     <DropdownMenu right>{IdeaSelections}</DropdownMenu> */}
                        {/* </UncontrolledDropdown> */}
                        {/*     <NavItem> */}
                        {/*         <NavLink to="/debugdata"> */}
                        {/*             <i className="fas fa-map-marker-alt"></i>{" "} */}
                        {/*             Debug Data */}
                        {/*         </NavLink> */}
                        {/*     </NavItem> */}
                        {/*     <NavItem> */}
                        {/*         <NavLink to="/build-and-price"> */}
                        {/*             <i className="fas fa-cog"></i> Build And */}
                        {/*             Price */}
                        {/*         </NavLink> */}
                        {/*     </NavItem> */}
                        {/*     <NavItem> */}
                        {/*         <NavLink to="/Login"> */}
                        {/*             <i className="fas fa-login"></i> Login */}
                        {/*         </NavLink> */}
                        {/*     </NavItem> */}
                        {!this.props.isAuthenticated ? (
                            <NavItem>
                                <NavLink
                                    tag={Link}
                                    to={{
                                        pathname: "/auth/login",
                                        state: { login: true, signup: false }
                                    }}
                                >
                                    <i className="fas fa-login"></i> Inloggen
                                </NavLink>
                            </NavItem>
                        ) : (
                            <NavItem>
                                <NavLink tag={Link} to="/auth/logout">
                                    <i className="fas fa-logout"></i> Logout
                                </NavLink>
                            </NavItem>
                        )}
                        {!this.props.isAuthenticated ? (
                            <NavItem>
                                <NavLink
                                    tag={Link}
                                    to={{
                                        pathname: "/auth/signup",
                                        state: { signup: true, login: false }
                                    }}
                                >
                                    <i className="fas fa-signup"></i>{" "}
                                    Registreren
                                </NavLink>
                            </NavItem>
                        ) : null}
                    </Nav>
                </Collapse>
            </Navbar>
            // <NavComponent
            //     logged_in={logged_in}
            //     handleLogin={this.handleLogin}
            //     handleLoginChange={this.handleLoginChange}
            //     handleLogout={this.handleLogout}
            //     username={username}
            //     displayed_form={displayed_form}
            //     display_form={this.display_form}
            // />
            // <h3>
            //     {this.state.logged_in
            //         ? `Hello ${this.state.username}`
            //         : "Please log in"}
            // </h3>
        );
    }
}

export default TopNav;
