import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/header';
const Essence = React.lazy(() => import('./pages/essence'));
const Home = React.lazy(() => import('./pages/home'));

const App = () => (
  <React.Fragment>
    <Router>
      <Styles>
        <Header />
        <div className='main-content'>
          <React.Suspense fallback={<p>Loading..</p>}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/method-chunk/:name_id' component={Essence} />
            </Switch>
          </React.Suspense>
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
