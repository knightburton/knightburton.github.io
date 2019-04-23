import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { games } from '../../constants';

export default class Games extends React.PureComponent {
  render() {
    return (
      <Container className="py-5">
        <Row>
          {games.map(game => (
            <Col key={game.key} xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} lg={4} className="my-3">
              <Card key={game.key} className="h-100">
                <Card.Img variant="top" className="img-fluid border-bottom rounded-top" src={require(`../../public/images/${game.image}`)} />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{game.info}</Card.Subtitle>
                  <Card.Text>{game.description}</Card.Text>
                  <Card.Text>
                    <span>Supported platforms: </span>
                    {game.platforms.map(platform => (
                      <FontAwesomeIcon key={platform} icon={platform} className="mr-2" title={platform} />
                    ))}
                  </Card.Text>
                  <Card.Text>
                    <span>Engine: </span>
                    <Card.Link href={game.engine.link} target="blank">{game.engine.name}</Card.Link>
                  </Card.Text>
                  <Card.Link href={game.link} target="blank">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                    <span className="ml-2">GitHub code</span>
                  </Card.Link>
                  {game.demo &&
                    <Card.Link href={game.demo} target="blank">
                      <FontAwesomeIcon icon="play-circle" />
                      <span className="ml-2">Demo</span>
                    </Card.Link>
                  }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
