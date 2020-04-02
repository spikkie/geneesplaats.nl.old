import React from "react";
import Axios from "axios";
import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    ListGroup,
    ListGroupItem,
    Badge,
    Table,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap";

class DebugData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchTerm: "", debugcode: null };
    }

    componentDidMount() {
        Axios.get("http://127.0.0.1:8001/api/v1/idea/idea")
            .then(response => {
                console.log(response);
                this.setState({ debugcode: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.debugcode) {
            return <h1>debugcode</h1>;
        } else {
            return <h1>Error returning debugcode</h1>;
            // return null;
        }
    }
}

export default DebugData;
