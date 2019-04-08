import React from 'react';
import styled from 'styled-components';
import Jumbotron from 'react-bootstrap/Jumbotron';

import logo from '../assets/mbms_logo_react.gif';

export default (props) => {
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
    </Styles>
  )
}

const Styles = styled.div`
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
`