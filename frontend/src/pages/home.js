import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Card from '../components/card';
import { truncateString } from '../utils/string';
import './home.scss';

export default (props) => {
  const { history } = props;
  const [methodChunks, setMethodChunks] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then(response => response.json())
      .then(data => data.data)
      .then(methodChunks => setMethodChunks(methodChunks))
      .catch(err => alert(err))
  }, [])
  
  let methodChunksToRender = methodChunks;
  if (searchText) {
    methodChunksToRender = methodChunks.filter(m => m.name.toLowerCase().includes(searchText.toLowerCase()))
  }

  return (
    <React.Fragment>
      <Form className='search-bar'>
        <Form.Control
          placeholder='Method Chunk Name'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Form>
      <div className='card-deck'>
        {methodChunksToRender
          .map((m, index) => (
            <Card key={index}>
              <h5>{m.name}</h5>
              <p>{truncateString(m.description)}</p>
              <div className='group-button'>
                <Button
                  variant="primary"
                  onClick={e => history.push('/method-chunk/' + m.nameId)}
                >
                  Browse
                </Button>
                <Button
                  variant="primary"
                  onClick={e => history.push('/method-chunk/' + m.nameId)}
                >
                  Publish
                </Button>
              </div>  
            </Card>
          ))
        }
      </div>
    </React.Fragment>
  )
}