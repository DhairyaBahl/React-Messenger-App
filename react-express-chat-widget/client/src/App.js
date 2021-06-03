import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Client from './Client';
import Agent from './Agent';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <ul>
          <li>
            <Link to='/'>Client Home</Link>
          </li>
          <li>
            <Link to='/agent'>Agent Dashboard</Link>
          </li>
        </ul>
        <hr />
        <Route exact path='/' component={Client} />
        <Route path='/agent' component={Agent} />
      </React.Fragment>
    </Router>
  );
}

export default App;
