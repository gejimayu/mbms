import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../components/sidebar';
import MethodChunk from './methodchunk';
import Alpha from './alpha';

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

  return (
    <Styles>
      { methodChunk && (
        <div className='main'>
          <Sidebar className='sidebar' methodChunk={methodChunk} />
          <Switch>
            <Route
              path={`${match.path}/alpha/:name_id`}
              render={props => <Alpha {...props} methodChunk={methodChunk} />}
            />
            <Route
              path={`${match.path}`}
              render={props => <MethodChunk {...props} methodChunk={methodChunk} />}
            />
          </Switch>
        </div>
      )}
    </Styles>
  )
}

const Styles = styled.div`
  height: 80vh;
  & > .main {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
`