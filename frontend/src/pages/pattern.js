import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './pattern.scss'
import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';

export default (props) => {
  const { methodChunk, match } = props;
  const { patterns } = methodChunk;
  const { params: { name_id: patternId } } = match;
  if (!methodChunk || !patternId || !patterns) return null;
  const pattern = patterns.find(p => p.nameId === patternId)
  if (!pattern) return null;
  
  let relatedActivities = []
  console.log(pattern)
  pattern.activities.forEach(activityToFind => {
    methodChunk.activitySpaces.forEach(activitySpace => {
      activitySpace.activities.forEach(activity => {
        console.log(activity.nameId, activityToFind.nameId)
        if (activity.nameId === activityToFind) {
          relatedActivities.push(activity);
        }
      })
    })
  })

  let relatedAlphas = []
  pattern.alphas.forEach(alphaToFind => {
    methodChunk.alphas.forEach(alpha => {
      if (alpha.nameId === alphaToFind) {
        relatedAlphas.push(alpha);
      }
    })
  })

  let relatedCompetencies = []
  pattern.competencies.forEach(competencyToFind => {
    methodChunk.competencies.forEach(competency => {
      if (competency.nameId === competencyToFind) {
        relatedCompetencies.push(competency);
      }
    })
  })

  return (
    <div className='container'>
      <div className='header'>
        <h4>{pattern.name}</h4>  
      </div>
      <div className='desc'>
        <p>{pattern.description}</p>
      </div>
      <Row className='content'>
        <Col sm={8} className='contain'>
          <div key={1} className='element'>
            <h5>Related To</h5>
            <CardDeck>
              {relatedAlphas.map(alpha => (
                <Card key={alpha.nameId}>
                  <Card.Img variant="top" src={alphaImg} />
                  <Card.Title>{alpha.name}</Card.Title>
                  <Card.Text>{alpha.description}</Card.Text>
                </Card>
              ))}
              {relatedActivities.map(activity => (
                <Card key={activity.nameId}>
                  <Card.Img variant="top" src={activityImg} />
                  <Card.Title>{activity.name}</Card.Title>
                  <Card.Text>{activity.description}</Card.Text>
                </Card>
              ))}
              {relatedCompetencies.map(competency => (
                <Card key={competency.nameId}>
                  <Card.Img variant="top" src={competencyImg} />
                  <Card.Title>{competency.name}</Card.Title>
                  <Card.Text>{competency.description}</Card.Text>
                </Card>
              ))}
            </CardDeck>
          </div>
          <div key={2} className='element'>
            <h5>Contains</h5>
            <CardDeck>
              {pattern.subpatternIds.map(subpatternId => {
                const relatedPattern = patterns.find(p => p.nameId === subpatternId);
                return (
                  <Card key={relatedPattern.nameId}>
                    <Card.Img variant="top" src={patternImg} />
                    <Card.Title>{relatedPattern.name}</Card.Title>
                    <Card.Text>{relatedPattern.description}</Card.Text>
                  </Card>
                );
              })}
            </CardDeck>
          </div>
        </Col>
      </Row>
    </div>
  )
}