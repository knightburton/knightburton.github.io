import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { games } from '../../constants';

export default class Games extends React.PureComponent {
  render() {
    return (
      <Container className="my-5 text-center position-relative">
        <p className="header-icon m-0">
          <FontAwesomeIcon icon="gamepad" className="display-4 mb-3" />
        </p>
        <ul>
          {games.map(game => (
            <li key={game.key} className="mb-3">
              <p className="m-0">
                <span>{game.name}</span>
                {game.demo &&
                  <small>
                    <a href={game.demo} target="blank">
                      <FontAwesomeIcon icon="play-circle" className="ml-2 cursor-pointer" />
                    </a>
                  </small>
                }
              </p>
              <small><a href={game.link} target="blank">{game.link}</a></small>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
