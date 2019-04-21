import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages/home';
import Essence from './pages/essence';
import Header from './components/header';

const App = () => (
  <React.Fragment>
    <Router>
      <Styles>
        <Header />
        <div className='main-content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/method-chunk/:name_id' component={Essence} />
          </Switch>
        </div>
      </Styles>
    </Router>
  </React.Fragment>
)

const Styles = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`

export default App;
