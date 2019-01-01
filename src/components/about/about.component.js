import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Card from 'react-bootstrap/lib/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { experiences, schools, skills } from '../../constants';

export default class About extends React.PureComponent {
  render() {
    return (
      <Container fluid={true} id="about" className="my-5 py-5">
        <h5 className="text-center my-5">About me</h5>
        <Row className="mt-5 text-center">
          <Col>
            <p>
              Ever since I was a kid I play with program codes, computer games and I have been interested with IT technology.
              My interest began with a Commodore 64 computer which has a huge impress on me (I still really love the 8bit stuffs).
            </p>
            <p>
              I really enjoy create things which could bring change, fun or something valuable into this world.
              Therefore I am open to everything that related to a bit or something electrical.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={6} className="my-2">
            <h5>Experiences</h5>
            <ListGroup>
              {experiences.map((experience, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{experience.name}</h5>
                    <small>{experience.duration}</small>
                  </div>
                  <p className="mb-1 text-muted">{experience.place}</p>
                  <small>
                    <a href={experience.link} target="blank">{experience.link}</a>
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={6} className="my-2">
            <h5>Schools</h5>
            <ListGroup>
              {schools.map((school, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{school.name}</h5>
                    <small>{school.duration}</small>
                  </div>
                  <p className="mb-1 text-muted">{school.school}</p>
                  <small>
                    <a href={school.link} target="blank">{school.link}</a>
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h5>Skills and tools</h5>
            <Card>
              <Card.Body>
                {skills.map(skill => (
                  skill.icon === ''
                    ? <span key={skill.name} className="mr-2 hover">{skill.name} </span>
                    : <FontAwesomeIcon key={skill.name} icon={['fab', skill.icon]} className="mr-2 h3 hover" title={skill.name} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
