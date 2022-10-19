import React, { Component } from "react";
import { Container, Form, Input, Button, Grid,Message } from "semantic-ui-react";
import Http from "../../utils/Http";
import { Link } from "react-router-dom";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      phone: "",
      fieldError:false,
      errorMessage:'',
      successMessage:'',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value,fieldError:false,successMessage:'' });
  };
  submit = (e) => {
    e.preventDefault();
    this.setState({successMessage:'' });
    const phone = this.state.phone;
    const fName = this.state.fName;
    const lName = this.state.lName;

    if(!phone || !fName || !lName){
      this.setState({fieldError:true,errorMessage:'First Name ,Last Name and phone number is required'})
      return;
    }
    if(phone.length != 10){
      this.setState({fieldError:true,errorMessage:'Invalid Phone Number'})
      return;
    }
    this.setState({successMessage:''});
    Http.post("contact/add",this.state)
      .then((res) => {
        console.log(res.data.message);
        if(res.data.error){
          return this.setState({fieldError:true,errorMessage:res.data.message});          
        }
        this.setState({successMessage:res.data.message});

      })
      .catch((err) => {
        return this.setState({fieldError:true,errorMessage:err});
        console.log(err.message);
      });
  };

  render() {
    return (
      <Container text style={{ marginTop: "2em" }}>
      <div style={{ paddingBottom: "3em" }}>         
         <Button floated="right" color="red" to="/contact/list" as={Link}>Back</Button>
      </div>
        {/* <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right arrow' />
    <Breadcrumb.Section active>Add Contact</Breadcrumb.Section>
  </Breadcrumb> */}
    {this.state.successMessage && <Message color="green" size='mini'>{this.state.successMessage}</Message>}
    {this.state.fieldError && <Message color="red" size='mini'>{this.state.errorMessage}</Message>}
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
                    value={this.state.phone}
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
                
                  type="reset"                  
                >
                  Reset
                </Button>
                <Button
                  color="green"
                  type="submit"
                  onClick={this.submit}
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
