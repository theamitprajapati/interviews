import React, { Component } from "react";
import { Container, Table, Message, Button } from "semantic-ui-react";
import Http from "../../utils/Http";
import { Link } from "react-router-dom";

class ListContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      message: "",
    };
  }

  componentDidMount() {
    Http.get("contact/list")
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          return this.setState({ message: res.data.message });
        }
        this.setState({ dataList: res.data.data });
      })
      .catch((err) => {
        this.setState({ message: err });
        console.log(err.message);
      });
  }

  render() {
    console.log(this.state.dataList);
    return (
      <Container text style={{ marginTop: "2em" }}>
        {this.state.message && (
          <Message color="red" size="mini">
            {this.state.message}
          </Message>
        )}
        <div style={{ paddingBottom: "2em" }}>
         
          <Button floated="right" color="violet" to="/contact/add" as={Link}>
            Add Contact
          </Button>
        </div>
        <Table celled selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.dataList.map((row,i) => {               const url = `/contact/details?phone=${row.phone}`
              //const url = `/message/send?phone=${row.phone}`
              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    {row.fName} {row.lName}
                  </Table.Cell>
                  <Table.Cell>{row.phone}</Table.Cell>
                  <Table.Cell>
                    <Button primary to={url} as={Link}>
                      Message
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ListContact;
