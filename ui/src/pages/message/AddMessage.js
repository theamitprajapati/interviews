import React, { Component } from "react";
import {
  Container,
  Form,
  Input,
  Button,
  Grid,
  Message,
  TextArea,
} from "semantic-ui-react";
import Http from "../../utils/Http";
import { Link } from "react-router-dom";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: (new URLSearchParams(window.location.search)).get("phone"),
      name:"",
      otp:this.getOtp(),
      message:"Hi,Your OTP is:",
      errorMessage: "",
      successMessage: "",
    };
  }
  getOtp() { 
    return Math.floor(100000 + Math.random() * 900000);
  }

  componentDidMount() {
  
    Http.get("contact/details/"+this.state.phone)
      .then((res) => {
        if (res.data.error) {
          return this.setState({ errorMessage: res.data.message });
        }
        this.setState({ name: `${res.data.data.fName} ${res.data.data.lName}` });
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
        this.setState({ successMessage: res.data.message,otp:this.getOtp() });
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
          <Button floated="right" color="red" to={`/contact/details?phone=${this.state.phone}`} as={Link}>
            Back
          </Button>
        </div> 
        {this.state.errorMessage && <Message color="red" size='mini'>{this.state.errorMessage}</Message>}
        {this.state.successMessage && <Message color="green" size='mini'>{this.state.successMessage}</Message>}
        {!this.state.errorMessage &&
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                  <Form.Field
                  name="message"
                    control={TextArea}
                    label="Message"
                    required="required"
                    value={this.state.message + this.state.otp}
                    placeholder="Enter Message"
                    onChange={this.handleChange}
                  />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button type="reset">Reset</Button>
                <Button color="green" type="submit" onClick={this.submit}>
                  Send
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
export default AddContact;
