import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Collapse from 'react-bootstrap/lib/Collapse';
import Card from 'react-bootstrap/lib/Card';
import { contributions } from '../../constants';

export default class Contributions extends React.PureComponent {
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
      <Container fluid={true} id="contributions" className="my-5 py-5">
        <h5 className="text-center my-5">Contributions</h5>
        <Row className="justify-content-md-center">
          {contributions.map(contribution => (
            <Col
              key={`${contribution.key}-handler`}
              xs={6}
              md={2}
              className="cursor-pointer"
              onClick={() => this.handleImageClick(contribution.key)}
              aria-controls={`${contribution.key}-collapse`}
              aria-expanded={this.getExpandState(contribution.key)}
            >
              <Image
                src={require(`../../public/images/${contribution.image}`)}
                className="border"
                roundedCircle
                fluid
              />
              <h6 className={`text-center my-2 ${this.getExpandState(contribution.key) ? '' : 'text-muted'}`}>{contribution.name}</h6>
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          {contributions.map(contribution => (
            <Col key={`${contribution.key}-info`} md={12}>
              <Collapse in={this.getExpandState(contribution.key)}>
                <Card id={`${contribution.key}-collapse`}>
                  <Card.Body>
                    <Card.Text>{contribution.description.trim()}</Card.Text>
                    <Card.Text>
                      <span className="mr-2">Link: </span>
                      <Card.Link href={contribution.link}>{contribution.link}</Card.Link>
                    </Card.Text>
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
