import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import MethodChunk from './pages/method-chunk';

const App = () => (
  <React.Fragment>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/method-chunk/:name_id' component={MethodChunk} />
      </Switch>
    </Router>
  </React.Fragment>
)

export default App;
