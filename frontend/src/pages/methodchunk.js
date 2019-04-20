import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import './methodchunk.scss';
import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';

export default (props) => {
  const { methodChunk, match } = props;
  
  if (methodChunk) {
    return (
      <div className='container'>
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
              <Link key={alpha.nameId} to={`${match.url}/alpha/${alpha.nameId}`}>
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
                  <Link key={activity.nameId} to={`${match.url}/activity/${activity.nameId}`}>
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
              <Link key={competency.nameId} to={`${match.url}/competency/${competency.nameId}`}>
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
              <Link key={pattern.nameId} to={`${match.url}/pattern/${pattern.nameId}`}>
                <Card>
                  <Card.Img variant="top" src={patternImg} />
                  <Card.Text>{pattern.name}</Card.Text>
                </Card>
              </Link>
            ))}
          </CardDeck>
        </div>
      </div>
    )
  }
  return null;
}