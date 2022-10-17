import React, { Component } from "react";
import { Container, Form, Input, Button, Grid,Message,Table } from "semantic-ui-react";
import Http from "../../utils/Http";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      phone: "",
      fieldError:false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value,fieldError:false });
  };
  submit = () => {
    const phone = this.state.phone;
    const fName = this.state.fName;
    const lName = this.state.lName;

    if(!phone || !fName || !lName){
      this.setState({fieldError:true})
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
        {/* <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right arrow' />
    <Breadcrumb.Section active>Add Contact</Breadcrumb.Section>
  </Breadcrumb> */}
    {this.state.fieldError && <Message color="red" size='mini'>First Name ,Last Name and phone number is required</Message>}
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>First Name</label>
                  <Input
                    required="required"
                    onChange={this.handleChange}
                    placeholder="Enter First Name"
                    name="fName"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Last Name</label>
                  <Input
                  required="required"
                    onChange={this.handleChange}
                    name="lName"
                    placeholder="Enter Last Name"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Phone</label>

                  <Input
                  required="required"
                     pattern="[1-9]{1}[0-9]{9}"
                     type="tel"
                    name="phone"
                    placeholder="Enter Phone"
                    title="Invalid Phone Number Example:9628281021"
                    onChange={this.handleChange}
                  />
                  <small>Phone number should be 10 digit</small>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button
                  color="green"
                  type="submit"
                  onClick={() => this.submit()}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

export default AddContact;
