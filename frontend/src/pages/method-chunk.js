import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';
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
      { methodChunk && (
        <div className='main'>
          <Sidebar className='sidebar' methodChunk={methodChunk} />
          <div className='content'>
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
                   <Card>
                    <Card.Img variant="top" src={alphaImg} />
                    <Card.Text>{alpha.name}</Card.Text>
                  </Card>
                ))}
              </CardDeck>
            </div>
            <div className='element'>
              <p>Activities</p>
              <CardDeck>
                {methodChunk.activitySpaces &&
                  methodChunk.activitySpaces.map(activitySpace => (
                    activitySpace.activities && activitySpace.activities.map(activity => (
                      <Card>
                        <Card.Img variant="top" src={activityImg} />
                        <Card.Text>{activity.name}</Card.Text>
                      </Card>
                    )) 
                  )
                )}
              </CardDeck>
            </div>
            <div className='element'>
              <p>Competencies</p>
              <CardDeck>
                {methodChunk.competencies && methodChunk.competencies.map(competency => (
                   <Card>
                    <Card.Img variant="top" src={competencyImg} />
                    <Card.Text>{competency.name}</Card.Text>
                  </Card>
                ))}
              </CardDeck>
            </div>
            <div className='element'>
              <p>Patterns</p>
              <CardDeck>
                {methodChunk.patterns && methodChunk.patterns.map(pattern => (
                   <Card>
                    <Card.Img variant="top" src={patternImg} />
                    <Card.Text>{pattern.name}</Card.Text>
                  </Card>
                ))}
              </CardDeck>
            </div>
          </div>
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
    & > .content {
      width: 75%;
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
          & .card {
            margin: 4px;
            padding: 10px;
            flex: 0 0 20%;
            display: flex;
            flex-direction: column;
            & .card-img-top {
              max-width: 100px;
              max-height: 60%;
              margin: auto;
            }
            & .card-text {
              text-align: center;
              min-height: 40%;
              margin: 0;
              font-size: 0.9em;
            }
          }
        }
      }
    }
  }
`