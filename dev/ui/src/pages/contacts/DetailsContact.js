import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  Grid,
  Message,
} from "semantic-ui-react";
import Http from "../../utils/Http";
import { Link } from "react-router-dom";

class DetailsContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: (new URLSearchParams(window.location.search)).get("phone"),
      name:"",
      message:"Hi,Your OTP is:",
      errorMessage: "",
      successMessage: "",
      contact:{fName:'',lName:'',phone:''}
    };
  }

  componentDidMount() {
  
    Http.get("contact/details/"+this.state.phone)
      .then((res) => {
        if (res.data.error) {
          return this.setState({ errorMessage: res.data.message });
        }
        this.setState({ fName:res.data.data.fName,lName:res.data.data.lName,phone:res.data.data.phone,name: `${res.data.data.fName} ${res.data.data.lName}` });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value, fieldError: false, successMessage: "" });
  };
  submit = (e) => {
    this.setState({ successMessage: "",errorMessage:'' });
    const phone = this.state.phone;

    if (!phone) {
      this.setState({
        errorMessage: "Phone number is required",
      });
      return;
    }
    // if (phone.length != 10) {
    //   this.setState({ fieldError: true, errorMessage: "Invalid Phone Number" });
    //   return;
    // }
    this.setState({ successMessage: "" });
    Http.post("message/send", this.state)
      .then((res) => {
        if (res.data.error) {
          return this.setState({
            errorMessage: res.data.message,
          });
        }
        this.setState({ successMessage: res.data.message });
        e.target.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <Container text style={{ marginTop: "2em" }}>
        <div style={{ paddingBottom: "3em" }}>
          <Button floated="right" color="red" to="/contact/list" as={Link}>
            Back
          </Button>
        </div> 
        {this.state.errorMessage && <Message color="red" size='mini'>{this.state.errorMessage}</Message>}
        {this.state.successMessage && <Message color="green" size='mini'>{this.state.successMessage}</Message>}
        {!this.state.errorMessage &&
        <Form>
          <Grid columns={2}>
          <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>First Name</label>
                  {this.state.fName}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Last Name</label>
                  {this.state.lName}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <Form.Field>
                  <label>Phone</label>
                  {this.state.phone}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
              <Button color="green" to={`/message/send?phone=${this.state.phone}`} as={Link}>
            Send Message
          </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
  }
      </Container>
    );
  }
}
export default DetailsContact;
