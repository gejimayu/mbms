import React from 'react';
import styled from 'styled-components';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'

import logo from '../assets/mbms_logo_react.gif';
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
      <Jumbotron className='jumbo'>
        <img src={logo} alt='Logo' />
        <div className='header-desc'>
          <h1>Method Base Management System</h1>
          <p>
            This is a repository of method chunks. You can find various kind of method chunks that's gathered
            from public. With all these method chunks, you can start to create your own method to accomodate
            the needs of your teem. This is a tool to help method engineering.&nbsp;
          </p> 
          <a href='https://en.wikipedia.org/wiki/Method_engineering'>
            Click here for more information about
            method engineering
          </a>
        </div>
      </Jumbotron>
      <Form className='search-bar'>
        <Form.Control placeholder='Method Chunk ID' />
        <Button variant='primary' type='submit'>
          Search
        </Button>
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

  .jumbo {
    background-color: #ffffff;
    height: 17.5%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
    padding: 2% 8%;
    & img {
      width: 150px;
      height: 15%; 
    }
    & .header-desc {
      width: 80%;
      & h1 {
        font-size: 1.7em;
      }
      & p {
        font-size: 0.9em;
      }
      & a {
        font-size: 0.9em;
      }
    }
    & a {
      display: inline;
    }
    & p {
      display: inline;
      margin-bottom: 0px;
      text-align: justify;
    }
  }
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