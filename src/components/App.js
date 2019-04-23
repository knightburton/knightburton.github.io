import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './home/home.component';
import Menu from './menu/menu.component';
import About from './about/about.component';
import Games from './games/games.component';
import Contributions from './contributions/contributions.component';
import Pages from './pages/pages.component';
import Footer from './footer/footer.component';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Menu />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/contributions" component={Contributions} />
          <Route exact path="/pages" component={Pages} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
