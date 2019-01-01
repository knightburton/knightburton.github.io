import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Collapse from 'react-bootstrap/lib/Collapse';
import Card from 'react-bootstrap/lib/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { games } from '../../constants';

export default class Games extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: ''
    };

    this.handleImageClick = key => this.setState(state => ({ open: state.open === key ? '' : key }));
    this.getExpandState = key => this.state.open === key;
  }

  render() {
    return (
      <Container fluid={true} id="games" className="my-5 py-5">
        <h5 className="text-center my-5">Games</h5>
        <Row className="justify-content-md-center">
          {games.map(game => (
            <Col
              key={`${game.key}-handler`}
              xs={6}
              md={2}
              className="cursor-pointer"
              onClick={() => this.handleImageClick(game.key)}
              aria-controls={`${game.key}-collapse`}
              aria-expanded={this.getExpandState(game.key)}
            >
              <Image
                src={require(`../../public/images/${game.image}`)}
                className="border"
                roundedCircle
                fluid
              />
              <h6 className={`text-center my-2 ${this.getExpandState(game.key) ? '' : 'text-muted'}`}>{game.name}</h6>
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          {games.map(game => (
            <Col key={`${game.key}-info`} md={12}>
              <Collapse in={this.getExpandState(game.key)}>
                <Card id={`${game.key}-collapse`}>
                  <Card.Body>
                    <Card.Title>{game.info}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <small>
                        <span>{game.engine.name}: </span>
                        <a href={game.engine.link} target="blank">{game.engine.link}</a>
                      </small>
                    </Card.Subtitle>
                    <Card.Text>{game.description.trim()}</Card.Text>
                    <Card.Text>
                      <span className="mr-2">Supported platforms: </span>
                      {game.platforms.map(platform => <FontAwesomeIcon key={platform} icon={platform} className="mr-2" />)}
                    </Card.Text>
                    <Card.Text>
                      <Card.Link href={game.link}>{game.link}</Card.Link>
                    </Card.Text>
                    {game.demo &&
                      <Card.Text>
                        <Card.Link href={game.demo}>Play with the demo</Card.Link>
                      </Card.Text>
                    }
                  </Card.Body>
                </Card>
              </Collapse>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
