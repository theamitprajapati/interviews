import React from "react";
import {
    Container,
    Button,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react';
  import {Link} from 'react-router-dom';
 function Layout(props) {

    const {children } = props
  return <div>  <Menu  inverted>
      <Container>
        <Menu.Item to="/" as={Link} header>
          <Image size='mini' src='https://react.semantic-ui.com/logo.png' style={{ marginRight: '1.5em' }} />
          Contacts Web App
        </Menu.Item>             
        <Dropdown item simple text='First Menu Option'>
          <Dropdown.Menu>
            <Dropdown.Item  to="/contact/list" as={Link}>List of Contacts</Dropdown.Item>
            {/* <Dropdown.Item  to="/contact/info" as={Link}>Contact Info Page</Dropdown.Item>
            <Dropdown.Item  to="/message/send" as={Link}>New Message Screen (Compose)</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>     
        <Dropdown item simple text='Second Menu Option'>
          <Dropdown.Menu>
            <Dropdown.Item to="/message/list" as={Link}>List of message sent</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
    {children}
    </div>

 }
 export default Layout;