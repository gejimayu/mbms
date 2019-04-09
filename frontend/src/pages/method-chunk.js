import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Sidebar from '../components/sidebar';

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
      <div className='content'>
        { methodChunk && <Sidebar methodChunk={methodChunk}/> }
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  .content {
    display: flex;
    flex-direction: row;
  }
`