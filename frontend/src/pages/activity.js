import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import alphaImg from '../assets/alpha.png';
import activitySpaceImg from '../assets/activityspace.png';
import workProductImg from '../assets/workproduct.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';
import { truncateString } from '../utils/string';

export default (props) => {
  const { methodChunk, match } = props;
  const { activitySpaces } = methodChunk;
  const { params: { name_id: activityId } } = match;
  if (!methodChunk || !activityId || !activitySpaces) return null;
  let activity = {};
  let activitySpace = {};
  activitySpaces.forEach(activitySpaceToFind => {
    activitySpaceToFind.activities.forEach(activityToFind => {
      if (activityToFind.nameId === activityId) {
        activity = activityToFind;
        activitySpace = activitySpaceToFind;
      }
    })
  });
  if (!activitySpace || !activity) return null;

  let relatedPatterns = []
  methodChunk.patterns.forEach(pattern => {
    pattern.activities.forEach(related => {
      if (related.includes(activity.nameId)) {
        relatedPatterns.push(pattern);
      }
    })
  })

  return (
    <Styles>
      <div className='header'>
        <h4>{activity.name}</h4>  
      </div>
      <div className='desc'>
        <p>{activity.description}</p>
      </div>
      <Row className='content'>
        <Col sm={8} className='contain'>
          <div key={1} className='element'>
            <h5>Entry Criterions</h5>
            <CardDeck>
              {activity.entryCriterions.alphas.map((alphaToFind, i) => {
                const relatedAlpha = methodChunk.alphas.find(a => alphaToFind.includes(a.nameId));
                return (
                  <Card key={i}>
                    <Card.Img variant="top" src={alphaImg} />
                    <Card.Title>{relatedAlpha.name}</Card.Title>
                    <Card.Text>{truncateString(relatedAlpha.description, 65)}</Card.Text>
                    <ul>
                      <li>{alphaToFind.split('.')[1]}</li>
                    </ul>
                  </Card>
                )
              })}
              {activity.entryCriterions.workProducts.map((workProductToFind, i) => {
                let relatedWP = {};
                methodChunk.alphas.forEach(alpha => {
                  alpha.workProducts.forEach(workProduct => {
                    if (workProductToFind.includes(workProduct.nameId)) {
                      relatedWP = workProduct;
                    }
                  })
                })
                return (
                  <Card key={i}>
                    <Card.Img variant="top" src={workProductImg} />
                    <Card.Title>{relatedWP.name}</Card.Title>
                    <Card.Text>{truncateString(relatedWP.description, 65)}</Card.Text>
                    <ul>
                      <li>{workProductToFind.split('.')[1]}</li>
                    </ul>
                  </Card>
                )
              })}
            </CardDeck>
          </div>
          <div key={2} className='element'>
            <h5>Completion Criterions</h5>
            <CardDeck>
              {activity.completionCriterions.alphas.map((alphaToFind, i) => {
                const relatedAlpha = methodChunk.alphas.find(a => alphaToFind.includes(a.nameId));
                return (
                  <Card key={i}>
                    <Card.Img variant="top" src={alphaImg} />
                    <Card.Title>{relatedAlpha.name}</Card.Title>
                    <Card.Text>{truncateString(relatedAlpha.description, 65)}</Card.Text>
                    <ul>
                      <li>{alphaToFind.split('.')[1]}</li>
                    </ul>
                  </Card>
                )
              })}
              {activity.completionCriterions.workProducts.map((workProductToFind, i) => {
                let relatedWP = {};
                methodChunk.alphas.forEach(alpha => {
                  alpha.workProducts.forEach(workProduct => {
                    if (workProductToFind.includes(workProduct.nameId)) {
                      relatedWP = workProduct;
                    }
                  })
                })
                return (
                  <Card key={i}>
                    <Card.Img variant="top" src={workProductImg} />
                    <Card.Title>{relatedWP.name}</Card.Title>
                    <Card.Text>{truncateString(relatedWP.description, 65)}</Card.Text>
                    <ul>
                      <li>{workProductToFind.split('.')[1]}</li>
                    </ul>
                  </Card>
                )
              })}
            </CardDeck>
          </div>
        </Col>
        <Col sm={4} className='states'>
          <div className='activity-space'>
            <img src={activitySpaceImg} alt="activity space logo"/>
            <h5>{activitySpace.name}</h5>
            <p>{activitySpace.description}</p>
          </div>
          <div>
            <div>
              <h5>Required</h5>
              {activity.competencies.map(competency => (
                <div>
                  <img src={competencyImg} alt="competency logo"/>
                  <h6>{competency.split('.')[0]} level {competency.split('.')[1]}</h6>
                </div>
              ))}
            </div>
            <div>
              <h5>Related</h5>
              {relatedPatterns.map(pattern => (
                <div>
                  <img src={patternImg} alt="pattern logo"/>
                  <h6>{pattern.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </Col>
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
    & > .states {
      border-left: 1px solid black;
      padding-left: 30px;
      padding-top: 30px;
    }
    & > .contain {
      & > .element {
        padding: 20px 30px 0 30px;
        & .card-deck {
          padding: 0 50px;
          & .card {
            flex: 0 0 31%;
            height: 300px;
            margin: 4px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 0.9em;
            & .card-img-top {
              width: 100px;
              height: 75px;
              margin: 5px auto;
            }
            & ul {
              padding: 0;
              width: 100px;
              margin: auto;
            }
          }
        }
      }
    }
  }
`