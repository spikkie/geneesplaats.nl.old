import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TherapyRequestList from "./TherapyRequestList";
import NewTherapyRequestModal from "./NewTherapyRequestModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    TherapyRequests: []
  };

  componentDidMount() {
    this.resetState();
  }

  getTherapyRequests = () => {
    axios.get(API_URL).then(res => this.setState({ TherapyRequests: res.data }));
  };

  resetState = () => {
    this.getTherapyRequests();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <TherapyRequestList
              TherapyRequests={this.state.TherapyRequests}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewTherapyRequestModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
