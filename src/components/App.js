import React from 'react';

import Home from './home/home.component';
import About from './about/about.component';
import Footer from './footer/footer.component';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Home />
        <About />
        <Footer />
      </div>
    );
  }
}

export default App;
