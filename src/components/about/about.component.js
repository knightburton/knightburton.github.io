import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class About extends React.PureComponent {
  render() {
    return (
      <Container className="text-center py-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <p>
              Hi, nice to meet you! I'm a passionate programmer-computer-tech guy.
            </p>
            <p>
              I always played with tools that can do something with a few lines of code and electricity.
              I enjoy to create something that makes me happy and makes others happy as well on the other side of the screen.
              I've wokred with microcontrollers, PICs and self made stuffs, also used a few programming language on my journey.
            </p>
            <p>
              My favourite and most used language is JavaScript, but I know how to code in C, C++, PHP, Java, Python and so on...
              The point is, I love coding.
              Correspong to this, I've finished a few school which related to programming or electricity
              and my highest degree of training is a BSC degree (Software Engineering).
            </p>
            <p>
              In the past, I've worked as a freelancer for a short time and then I've spent 2 and a half year as a
              at the University of Szeged Department of Software Engineering as a Software Developer.
              Currently, I am working at JayStack as a Javascript Developer.
            </p>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <p>
              If you have any question or whatever, just find me on the Interwebs down below.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
