import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import TopNav from "./components/TopNav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DebugData from "./components/DebugData";
import Login from "./components/TopNav/Login";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ideaData: null
        };
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:8001/api/v1/idea/idea/")
            .then(response => {
                console.log(response);
                this.setState({ ideaData: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.ideaData) {
            return (
                <Router>
                    <div className="App">
                        <TopNav ideaData={this.state.ideaData} />
                        <div className="contentArea">
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Home
                                        {...props}
                                        ideaData={this.state.ideaData}
                                    />
                                )}
                            />
                            <Route path="/debugdata" component={DebugData} />
                            <Route path="/Login" component={Login} />
                        </div>
                        <Footer />
                    </div>
                </Router>
            );
        } else {
            return <h4>Loading Data...</h4>;
        }
    }
}

export default App;
