import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import logo from '../../public/images/style-logo-160x160.png';

export default class Home extends React.PureComponent {
  render() {
    return (
      <Container fluid={true} className="py-5 bg-light border-bottom" id="home">
        <Row>
          <Col md={5} className="text-right mobile mobile-text-center">
            <img src={logo} alt="logo"/>
          </Col>
          <Col sm={7} className="text-left mobile mobile-text-center">
            <h2 className="display-4 font-weight-bold mt-4 mb-0">Imre Kiss</h2>
            <p className="text-muted ml-1">
              <span>Javascript Developer at </span>
              <a href="https://jaystack.com/" taarget="blank">JayStack</a></p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="text-center font-italic">
            <p className="mb-0">"Never ignore coincidence. Unless, of course, you&apos;re busy. In which case, always ignore coincidence."</p>
            <p className="text-muted">The Doctor</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
