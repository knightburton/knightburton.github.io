import React from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { works } from '../../constants';

export default class Works extends React.PureComponent {
  render() {
    return (
      <Container className="my-5 text-center position-relative">
        <p className="header-icon m-0">
          <FontAwesomeIcon icon="tools" className="display-4 mb-3" />
        </p>
        <ul>
          {works.map(work => (
            <li key={work.key} className="mb-3">
              <p className="m-0">
                <span>{work.name}</span>
              </p>
              <small><a href={work.link} target="blank">{work.link}</a></small>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
