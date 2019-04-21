import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './essence.scss'
import Sidebar from '../components/sidebar';
const MethodChunk = React.lazy(() => import('./methodchunk'));
const Alpha = React.lazy(() => import('./alpha'));
const Activity = React.lazy(() => import('./activity'));
const Competency = React.lazy(() => import('./competency'));
const Pattern = React.lazy(() => import('./pattern'));

export default (props) => {
  const { match } = props;
  const nameId = match.params.name_id;
  const [methodChunk, setMethodChunk] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/' + nameId)
      .then(response => response.json())
      .then(data => data.data)
      .then(methodChunk => setMethodChunk(methodChunk))
      .catch(err => alert(err))
  }, [])
  
  if (methodChunk) {
    return (
      <div className='main'>
        <Sidebar className='sidebar' methodChunk={methodChunk} />
        <React.Suspense fallback={<p>Please Wait</p>}>
          <Switch>
            <Route
              path={`${match.path}/alpha/:name_id`}
              render={props => <Alpha {...props} methodChunk={methodChunk} />}
            />
            <Route
              path={`${match.path}/activity/:name_id`}
              render={props => <Activity {...props} methodChunk={methodChunk} />}
            />
            <Route
              path={`${match.path}/competency/:name_id`}
              render={props => <Competency {...props} methodChunk={methodChunk} />}
            />
            <Route
              path={`${match.path}/pattern/:name_id`}
              render={props => <Pattern {...props} methodChunk={methodChunk} />}
            />
            <Route
              path={`${match.path}`}
              render={props => <MethodChunk {...props} methodChunk={methodChunk} />}
            />
          </Switch>
        </React.Suspense>
      </div>
    )
  }
  return null;
}