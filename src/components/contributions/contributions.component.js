import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contributions } from '../../constants';

export default class Contributions extends React.PureComponent {
  render() {
    return (
      <Container className="my-5 text-center position-relative">
        <p className="header-icon m-0">
          <FontAwesomeIcon icon="code-branch" className="display-4 mb-3" />
        </p>
        <ul>
          {contributions.map(contribution => (
            <li key={contribution.key} className="mb-3">
              <p className="m-0">
                <span>{contribution.name}</span>
              </p>
              <small><a href={contribution.link} target="blank">{contribution.link}</a></small>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
