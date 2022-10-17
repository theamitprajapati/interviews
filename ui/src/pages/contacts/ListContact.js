import React, { Component } from "react";
import {
  Container,
    Table,
    Button
} from "semantic-ui-react";
import Http from "../../utils/Http";
import {Link} from 'react-router-dom';

class ListContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      phone: "",
      fieldError: false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value, fieldError: false });
  };
  submit = () => {
    const phone = this.state.phone;
    const fName = this.state.fName;
    const lName = this.state.lName;

    if (!phone || !fName || !lName) {
      this.setState({ fieldError: true });
      return;
    }

    console.log(this.state.phone);
    Http.get("me")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <Container text style={{ marginTop: "2em" }}>      
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell><Button primary  to="/contact/add" as={Link}>Message</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell><Button primary  to="/contact/add" as={Link}>Message</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Denied</Table.Cell>
              <Table.Cell><Button primary to="/contact/add" as={Link}>Message</Button></Table.Cell>
            </Table.Row>
            
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ListContact;
