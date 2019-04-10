import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import competencyImg from '../assets/competency.png';

export default (props) => {
  const { methodChunk, match } = props;
  const { competencies } = methodChunk;
  const { params: { name_id: competencyId } } = match;
  if (!methodChunk || !competencyId || !competencies) return null;
  
  let competency = competencies.find(c => c.nameId === competencyId)
  if (!competency) return null;

  return (
    <Styles>
      <div className='header'>
        <h4>{competency.name}</h4>  
      </div>
      <div className='desc'>
        <p>{competency.description}</p>
      </div>
      <Row className='content'>
        <h5>Levels</h5>
        <table>
          {competency.levels.map((level, i) => (
              <tr>
                <td>{`Level ${i}`}</td>
                <td>{level.name}</td>
                <td>{level.description}</td>
              </tr>
          ))}
        </table>
      </Row>
    </Styles>
  )
}

const Styles = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 100%;
  & > .header {
    background-color: #cecece;
    text-align: center;
    padding: 10px;
  }
  & > .desc {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    min-height: 12%;
    padding: 10px;
  }
  & > .content {
    height: 65vh;
    overflow-y: scroll;
    padding: 20px 50px;
    & > h5 {
      width: 100%;
    }
    & > table {
      padding-left: 25px;
      width: 100%;
      & td {
        padding: 20px;
      }
      & td:nth-child(1) {
        width: 15%;
      }
      & td:nth-child(2) {
        width: 15%;
      }
    }
  }
`