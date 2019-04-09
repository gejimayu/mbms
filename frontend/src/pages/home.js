import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import { truncateString } from '../utils/string';

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
    <Styles>
      <Form className='search-bar' onSubmit={e => setSearchText(e.target.value)}>
        <Form.Control
          placeholder='Method Chunk Name'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button variant='primary' type='submit'>Search</Button>
      </Form>
      <CardDeck>
        {methodChunksToRender
          .map((m, index) => (
            <Card bg="light" key={index}>
              <Card.Body>
                <Card.Title>{m.name}</Card.Title>
                <Card.Text>{truncateString(m.description)}</Card.Text>
                <Button
                  variant="primary"
                  onClick={e => history.push('/method-chunk/' + m.nameId)}
                >
                  Browse
                </Button>
              </Card.Body>
            </Card>
          ))
        }
      </CardDeck>
    </Styles>
  )
}

const Styles = styled.div`
  .search-bar {
    height: 17.5%;
    width: 40%;
    height: 100px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & button {
      width: 20%;
      margin: auto;
    }
  }
  .card-deck {
    margin: 0 auto;
    width: 80%;
    & .card {
      flex: 0 0 22%;
      margin-bottom: 20px;
      & .card-body {
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & button {
          height: 20%;
          width: 40%;
          font-size: 0.85em;
        }
        & .card-text {
          height: 50%;
          font-size: 0.8em; 
          margin-bottom: 0;
        }
        & .card-title {
          height: 30%;
        }
      }
    }
  }
`