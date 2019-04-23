import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { withRouter, NavLink } from 'react-router-dom';

import { menu } from '../../constants';

class Menu extends React.PureComponent {
  render() {
    return (
      <div className="border-bottom mt-2 bg-light">
        <Container style={{ marginBottom: '-1px' }}>
          <Nav variant="tabs" defaultActiveKey="/" className="justify-content-center">
            {menu.map(item => (
              <Nav.Item key={item.key}>
                <NavLink to={item.link} className="nav-link" activeClassName="active" exact>
                  {item.text}
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
        </Container>
      </div>
    );
  }
}

export default withRouter(Menu);
