import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'

import Header from '../components/header';
import { truncateString } from '../utils/string';

export default (props) => {
  const methodChunks = [
    {
      title: 'Chunk1',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo neque debitis corrupti corporis voluptas, alias, placeat, quam facere pariatur, ullam libero perferendis cum mollitia praesentium eaque. Nisi ullam quisquam consequuntur?'
    },
    {
      title: 'Chunk2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo neque debitis corrupti corporis voluptas, alias, placeat, quam facere pariatur, ullam libero perferendis cum mollitia praesentium eaque. Nisi ullam quisquam consequuntur?'
    },
    {
      title: 'Chunk2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo neque debitis corrupti corporis voluptas, alias, placeat, quam facere pariatur, ullam libero perferendis cum mollitia praesentium eaque. Nisi ullam quisquam consequuntur?'
    },
    {
      title: 'Chunk2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo neque debitis corrupti corporis voluptas, alias, placeat, quam facere pariatur, ullam libero perferendis cum mollitia praesentium eaque. Nisi ullam quisquam consequuntur?'
    },
    {
      title: 'Chunk2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo neque debitis corrupti corporis voluptas, alias, placeat, quam facere pariatur, ullam libero perferendis cum mollitia praesentium eaque. Nisi ullam quisquam consequuntur?'
    },
  ]
  return (
    <Styles>
      <Header />
      <Form className='search-bar'>
        <Form.Control placeholder='Method Chunk ID' />
        <Button variant='primary' type='submit'>Search</Button>
      </Form>
      <CardDeck>
        {methodChunks.map(m => (
          <Card bg="light">
            <Card.Body>
              <Card.Title>{m.title}</Card.Title>
              <Card.Text>{truncateString(m.desc)}</Card.Text>
              <Button variant="primary">Browse</Button>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </Styles>
  )
}

const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .search-bar {
    height: 17.5%;
    width: 40%;
    height: 100px;
    margin: auto;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        & button {
          width: 40%;
          font-size: 0.85em;
        }
        & .card-text {
          font-size: 0.8em;
          text-align: justify;  
        }
      }
    }
  }
`