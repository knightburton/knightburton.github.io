import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import icons from './side.effects/fontawesome';

import 'typeface-roboto';
import './index.scss';

library.add(...icons);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
