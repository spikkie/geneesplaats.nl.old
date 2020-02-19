import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewTherapyRequestForm extends React.Component {
  state = {
    pk: 0,
    user: "",
  };

  componentDidMount() {
    if (this.props.TherapyRequest) {
      const { pk, user } = this.props.TherapyRequest;
      this.setState({ pk, user });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createTherapyRequest= e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editTherapyRequest= e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.TherapyRequest ? this.editTherapyRequest : this.createTherapyRequest}>
        <FormGroup>
          <Label for="user">user:</Label>
          <Input
            type="text"
            name="user"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewTherapyRequestForm;
