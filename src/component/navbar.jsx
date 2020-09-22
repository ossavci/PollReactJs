import React, { Component } from "react";
import {Navbar,Nav} from 'react-bootstrap'

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Polling</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Questions">Questions</Nav.Link>
              <Nav.Link href="/AddQuestions">Add New Question</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
