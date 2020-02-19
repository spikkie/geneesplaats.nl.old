import React, { Component } from "react";
import { Table } from "reactstrap";
import NewTherapyRequestModal from "./NewTherapyRequestModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class TherapyRequestList extends Component {
  render() {
    const TherapyRequests = this.props.TherapyRequests;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Therapy Request</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!TherapyRequests || TherapyRequests.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            TherapyRequests.map(TherapyRequest => (
              <tr key={TherapyRequest.pk}>
                <td>{TherapyRequest.user}</td>
                <td align="center">
                  <NewTherapyRequestModal
                    create={false}
                    TherapyRequest={TherapyRequest}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={TherapyRequest.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default TherapyRequestList;
