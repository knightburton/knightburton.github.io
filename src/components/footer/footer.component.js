import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { links } from '../../constants';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="border-top py-3 bg-light">
        <Container fluid>
          <Row noGutters>
            <Col className="text-center my-3">
              {links.map(link => (
                <a key={link.key} target="_target" href={link.url} className={`mx-2 h3 icon-color-${link.key}`}>
                  {link.key === 'instagram' &&
                    <svg width="0" height="0">
                      <radialGradient id="svg-instagram" r="150%" cx="30%" cy="107%">
                        <stop stopColor="#fdf497" offset="0" />
                        <stop stopColor="#fdf497" offset="0.05" />
                        <stop stopColor="#fd5949" offset="0.45" />
                        <stop stopColor="#d6249f" offset="0.6" />
                        <stop stopColor="#285AEB" offset="0.9" />
                      </radialGradient>
                    </svg>
                  }
                  <FontAwesomeIcon icon={['fab', link.key]} className={`icon-color-${link.key}`} />
                </a>
              ))}
            </Col>
          </Row>
        </Container>
        <p className="text-center text-muted mt-2">
          <FontAwesomeIcon icon="copyright" />
          <span> Copyright 2019 | KnightBurton</span>
        </p>
      </footer>
    );
  }
}
