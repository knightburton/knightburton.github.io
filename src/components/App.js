import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import { withRouter } from 'react-router-dom';
import Navigation from './navigation/navigation.component';
import Home from './home/home.component';
import About from './about/about.component';
import Games from './games/games.component';
import Contributions from './contributions/contributions.component';
import Works from './works/works.component';
import Footer from './footer/footer.component';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <Home />
          <About />
          <Games />
          <Contributions />
          <Works />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
