import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faFacebook, faTwitter, faInstagram, faTwitch, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

library.add(faLinkedin, faFacebook, faTwitter, faInstagram, faTwitch, faGithub, faStackOverflow, faCopyright);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
