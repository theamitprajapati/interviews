import React, { Component ,Suspense} from "react";
import "./App.css";
import Layout from "./Layout";
import Home from "./components/Home";
import Test from "./components/Test";
import {AddContact,ListContact} from "./pages/contacts";
import Default from "./Default";

import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
        <Router>
          <Layout>
            <Routes>
              <Route path="/"  element={<Suspense fallback={<div>Loading...</div>}><Home/>  </Suspense>} />
              <Route path="/contact/add" exact  element={<AddContact/>} />
              <Route path="/contact/details" exact element={<Test/>} />
              <Route path="/contact/list" exact element={<ListContact/>} />
              <Route path="/token/send" exact element={<Test/>} />
              <Route path="/token/list" exact element={<Test/>} />
              <Route element={Default}/>
            </Routes>
          </Layout>
        </Router>
    );
  }
}

export default App;
