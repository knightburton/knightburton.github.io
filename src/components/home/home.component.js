import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from '../../public/images/style-logo-160x160.png';

export default class Home extends React.PureComponent {
  render() {
    return (
      <Container className="py-5" id="home" fluid>
        <Row>
          <Col className="text-center">
            <div className="d-flex flex-row justify-content-center">
              <Image fluid src={logo} alt="logo" style={{ height: '76px' }} />
              <div className="mt-1 ml-3">
                <h2 className="display-4 font-weight-bold mb-0">Imre Kiss</h2>
                <p className="text-muted text-left ml-1 mt-n2">
                  <span>JavaScript Developer at </span>
                  <a href="https://jaystack.com/" target="blank">JayStack</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center font-italic">
            <p className="mb-0">"Never ignore coincidence. Unless, of course, you&apos;re busy. In which case, always ignore coincidence."</p>
            <p className="text-muted">The Doctor</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
