import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pages } from '../../constants';

export default class Pages extends React.PureComponent {
  render() {
    return (
      <Container className="py-5">
        <Row>
          {pages.map(page => (
            <Col key={page.key} xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} lg={4} className="my-3">
              <Card className="h-100">
                <Card.Img variant="top" className="img-fluid border-bottom rounded-top" src={require(`../../public/images/${page.image}`)} />
                <Card.Body>
                  <Card.Title>{page.name}</Card.Title>
                  <Card.Text>{page.description}</Card.Text>
                  <Card.Link href={page.link} target="blank">
                    <FontAwesomeIcon icon="globe" />
                    <span className="ml-2">{page.name}</span>
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
