import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Jumbotron from 'react-bootstrap/Jumbotron';

import logo from '../assets/mbms_logo_react.gif';

const Jumbo = styled(Jumbotron)`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  padding: 1% 8%;
  margin-bottom: 0;
  & img {
    width: 120px;
  }
  & .header-desc {
    width: 80%;
    & h1 {
      height: auto;
      font-size: 1.5em;
    }
    & p {
      font-size: 0.85em;
    }
    & a {
      font-size: 0.85em;
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
`

export default (props) => {
  return (
    <Jumbo>
      <Link to="/">
        <img src={logo} alt='Logo' />
      </Link>
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
    </Jumbo>
  )
}