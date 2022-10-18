import React, { Component ,Suspense} from "react";
import "./App.css";
import Layout from "./Layout";
import Home from "./components/Home";
import Test from "./components/Test";
import {AddContact,ListContact,DetailsContact} from "./pages/contacts";
import {AddMessage,ListMessage} from "./pages/message";
import Default from "./Default";

import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'


class App extends Component {

  render() {
    return (
        <Router>
          <Layout>
            <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/contact/add" exact  element={<AddContact/>} />
              <Route path="/contact/details" exact element={<DetailsContact/>} />
              <Route path="/contact/list" exact element={<ListContact/>} />
              <Route path="/message/send" exact element={<AddMessage/>} />
              <Route path="/message/list" exact element={<ListMessage/>} />
              <Route path="*" element={<Default/>}/>
            </Routes>
          </Layout>
        </Router>
    );
  }
}

export default App;
