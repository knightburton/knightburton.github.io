import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contributions } from '../../constants';

export default class Contributions extends React.PureComponent {
  render() {
    return (
      <Container className="py-5">
        <Row>
          {contributions.map(contribution => (
            <Col key={contribution.key} xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} lg={4} className="my-3">
              <Card className="h-100">
                <Card.Img variant="top" className="img-fluid border-bottom rounded-top" src={require(`../../public/images/${contribution.image}`)} />
                <Card.Body>
                  <Card.Title>{contribution.name}</Card.Title>
                  <Card.Text>{contribution.description}</Card.Text>
                  <Card.Link href={contribution.link} target="blank">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                    <span className="ml-2">GitHub code</span>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
