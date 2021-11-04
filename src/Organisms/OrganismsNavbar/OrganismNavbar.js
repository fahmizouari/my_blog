import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PageListUser from "../../Pages/PageUsers/PageListUsers";
import { withRouter } from 'react-router';
class OrganismNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      path: ""
    };
  }

  handleOnClick = (path) => {
    // some action...
    // then redirect
    this.props.history.push(path);
}
    render() { 

        return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4"> 
        <Container>
        <Navbar.Brand  onClick={()=>this.handleOnClick("/posts")}>My blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>this.handleOnClick("/posts")}>Posts</Nav.Link>
            <Nav.Link onClick={()=>this.handleOnClick("/users")}>Users</Nav.Link>
            <Nav.Link onClick={()=>this.handleOnClick("/counterHooks")}>counterHooks</Nav.Link>
            <NavDropdown title="Test" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=>this.handleOnClick("/counter")}>counter</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.handleOnClick("/counterHooks")}>counterHooks</NavDropdown.Item>
              <NavDropdown.Item href="#Page/3.3">Page 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#Page/3.4">Page 4</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link component={PageListUser}>Profil</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>;
    }
}
 
export default withRouter(OrganismNavBar);