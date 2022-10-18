import React, { Component } from "react";
import {
  Container,
  Form,
  Input,
  Button,
  Grid,
  Message,
} from "semantic-ui-react";
import Http from "../../utils/Http";
import { Link } from "react-router-dom";
const OTP = Math.floor(100000 + Math.random() * 900000)
class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: (new URLSearchParams(window.location.search)).get("phone"),
      name:"",
      otp:OTP,
      message:"Hi,Your OTP is:"+OTP,
      errorMessage: "",
      successMessage: "",
      title:false
    };
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
        this.setState({ successMessage: res.data.message,otp:OTP,title:true });
        
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
              <Form.Field>
                  <label>Message</label>
                  <Input                    
                    required="required"
                    onChange={this.handleChange}
                    name="message"
                    value={this.state.message}
                    placeholder="Enter Message"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button color="green" type="submit" onClick={this.submit}>{this.state.title?'Re-Send':'Send'}</Button>
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
