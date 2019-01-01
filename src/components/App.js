import React from 'react';
import { withRouter } from 'react-router-dom';
import Home from './home/home.component';
import Games from './games/games.component';
import Contributions from './contributions/contributions.component';
import Works from './works/works.component';
import Footer from './footer/footer.component';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Games />
        <Contributions />
        <Works />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
