import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/lib/Container';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { menu } from '../../constants';

class Navigation extends React.PureComponent {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <span className="text-danger">K</span>
            <span className="text-muted d-none d-lg-inline">night</span>
            <span className="text-danger">B</span>
            <span className="text-muted d-none d-lg-inline">urton</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navigation-collapse" />
          <Navbar.Collapse id="navigation-collapse">
            <Nav className="ml-auto">
              {menu.map(item => (
                <Nav.Item key={item.key}>
                  <Nav.Link href={item.url} active={false}>{item.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
