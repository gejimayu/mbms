import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';

export default (props) => {
  const { methodChunk, match } = props;
  
  if (methodChunk) {
    return (
      <Styles>
        <div className='header'>
          <h4>{methodChunk.name}</h4>  
        </div>
        <div className='desc'>
          <p>{methodChunk.description}</p>
        </div>
        <div className='element'>
          <p>Alphas</p>
          <CardDeck>
            {methodChunk.alphas && methodChunk.alphas.map(alpha => (
              <Link to={`${match.url}/alpha/${alpha.nameId}`}>
                <Card>
                  <Card.Img variant="top" src={alphaImg} />
                  <Card.Text>{alpha.name}</Card.Text>
                </Card>
              </Link>
            ))}
          </CardDeck>
        </div>
        <div className='element'>
          <p>Activities</p>
          <CardDeck>
            {methodChunk.activitySpaces &&
              methodChunk.activitySpaces.map(activitySpace => (
                activitySpace.activities && activitySpace.activities.map(activity => (
                  <Link to={`${match.url}/activity/${activity.nameId}`}>
                    <Card>
                      <Card.Img variant="top" src={activityImg} />
                      <Card.Text>{activity.name}</Card.Text>
                    </Card>
                  </Link>
                )) 
              )
            )}
          </CardDeck>
        </div>
        <div className='element'>
          <p>Competencies</p>
          <CardDeck>
            {methodChunk.competencies && methodChunk.competencies.map(competency => (
              <Link to={`${match.url}/competency/${competency.nameId}`}>
                <Card>
                  <Card.Img variant="top" src={competencyImg} />
                  <Card.Text>{competency.name}</Card.Text>
                </Card>
              </Link>
            ))}
          </CardDeck>
        </div>
        <div className='element'>
          <p>Patterns</p>
          <CardDeck>
            {methodChunk.patterns && methodChunk.patterns.map(pattern => (
              <Link to={`${match.url}/pattern/${pattern.nameId}`}>
                <Card>
                  <Card.Img variant="top" src={patternImg} />
                  <Card.Text>{pattern.name}</Card.Text>
                </Card>
              </Link>
            ))}
          </CardDeck>
        </div>
      </Styles>
    )
  }
  return null;
}

const Styles = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
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
  & > .element {
    padding: 20px 30px 0 30px;
    & .card-deck {
      padding: 0 75px;
      & a {
        flex: 0 0 20%;
        & .card {
          min-height: 90%;
          margin: 4px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          & .card-img-top {
            width: 100px;
            height: 60%;
            margin: 5px auto;
          }
          & .card-text {
            text-align: center;
            height: 40%;
            font-size: 0.9em;
          }
        }
      }
    }
  }
`