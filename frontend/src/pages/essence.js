import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './essence.scss'
import Sidebar from '../components/sidebar';
import MethodChunk from './methodchunk';
import Alpha from './alpha';
import Activity from './activity';
import Competency from './competency';
import Pattern from './pattern';

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
      </div>
    )
  }
  return null;
}