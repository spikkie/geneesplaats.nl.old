import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTherapyRequestForm from "./NewTherapyRequestForm";

class NewTherapyRequestModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Therapy Request";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New TherapyRequest";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewTherapyRequestForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              TherapyRequest={this.props.TherapyRequest}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewTherapyRequestModal;
