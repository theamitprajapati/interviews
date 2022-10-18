import React, { Component } from "react";
import { Container, Table, Message } from "semantic-ui-react";
import Http from "../../utils/Http";

class ListContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      message: "",
    };
  }

  componentDidMount() {
    Http.get("message/list")
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
  getHumanDate(data){
   const date =  new Date(data);
   console.log(data);
   return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
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
       
        <Table celled selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name of Contact</Table.HeaderCell>
              <Table.HeaderCell>Time Of SMS</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.dataList.map((row,i) => {
              return (
                <Table.Row>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{this.getHumanDate(row.created_time)}</Table.Cell>
                  <Table.Cell>{row.message}</Table.Cell>                  
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
