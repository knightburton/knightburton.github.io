import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Collapse from 'react-bootstrap/lib/Collapse';
import Card from 'react-bootstrap/lib/Card';
import { works } from '../../constants';

export default class Works extends React.PureComponent {
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
      <Container fluid={true} id="works" className="my-5 py-5">
        <h5 className="text-center my-5">Works</h5>
        <Row className="justify-content-md-center">
          {works.map(work => (
            <Col
              key={`${work.key}-handler`}
              xs={6}
              md={2}
              className="cursor-pointer"
              onClick={() => this.handleImageClick(work.key)}
              aria-controls={`${work.key}-collapse`}
              aria-expanded={this.getExpandState(work.key)}
            >
              <Image
                src={require(`../../public/images/${work.image}`)}
                className="border"
                roundedCircle
                fluid
              />
              <h6 className={`text-center my-2 ${this.getExpandState(work.key) ? '' : 'text-muted'}`}>{work.name}</h6>
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          {works.map(work => (
            <Col key={`${work.key}-info`} md={12}>
              <Collapse in={this.getExpandState(work.key)}>
                <Card id={`${work.key}-collapse`}>
                  <Card.Body>
                    <Card.Text>{work.description.trim()}</Card.Text>
                    <Card.Text>
                      <span className="mr-2">Link: </span>
                      <Card.Link href={work.link}>{work.link}</Card.Link>
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
