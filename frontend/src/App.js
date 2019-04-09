import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages/home';
import MethodChunk from './pages/method-chunk';
import Alpha from './pages/alpha';
import Header from './components/header';

const App = () => (
  <React.Fragment>
    <Router>
      <Styles>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/method-chunk/:name_id' component={MethodChunk} />
          <Route path='/method-chunk/:name_id/alpha/:alpha_id' component={Alpha} />
        </Switch>
      </Styles>
    </Router>
  </React.Fragment>
)

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export default App;
