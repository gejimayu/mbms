import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/card';
import styles from './activity.module.scss';
import alphaImg from '../../assets/alpha.png';
import activitySpaceImg from '../../assets/activityspace.png';
import workProductImg from '../../assets/workproduct.png';
import competencyImg from '../../assets/competency.png';
import patternImg from '../../assets/pattern.png';
import { truncateString, camelPad } from '../../utils/string';

export default (props) => {
  const { methodChunk, match } = props;
  const { params: { name_id: activityId } } = match;
  if (!methodChunk || !activityId) return null;
  let activity = {};
  let activitySpaces = [];
  methodChunk.activitySpaces.forEach(activitySpaceToFind => {
    activitySpaceToFind.activities.forEach(activityToFind => {
      if (activityToFind.nameId === activityId) {
        activity = activityToFind;
        activitySpaces.push(activitySpaceToFind);
      }
    })
  });
  if (!activitySpaces.length || !activity) return null;

  let relatedPatterns = []
  methodChunk.patterns.forEach(pattern => {
    pattern.activities.forEach(related => {
      if (related.includes(activity.nameId)) {
        relatedPatterns.push(pattern);
      }
    })
  })

  const link = `/method-chunk/${methodChunk.name}`

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h4>{activity.name}</h4>  
      </div>
      <div className={styles['desc']}>
        <p>{activity.description}</p>
      </div>
      <div className={styles['content']}>
        <div className={styles['contain']}>
          <div key={1} className={styles['element']}>
            <h5>Entry Criterions</h5>
            <div className={styles['card-deck']}>
              {activity.entryCriterions.alphas.map((alphaToFind, i) => {
                const relatedAlpha = methodChunk.alphas.find(a => alphaToFind.includes(a.nameId));
                return (
                  <Card
                    className={styles['card']} 
                    key={i}
                    link={`${link}/alpha/${relatedAlpha.nameId}`}
                  >
                    <img alt='alpha logo' src={alphaImg} />
                    <h6>{relatedAlpha.name}</h6>
                    <p>{truncateString(relatedAlpha.description, 65)}</p>
                    <ul>
                      <li>{camelPad(alphaToFind.split('.')[1])}</li>
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
                  <Card className={styles['card']} key={i}>
                    <img alt='workproduct logo' src={workProductImg} />
                    <h6>{relatedWP.name}</h6>
                    <p>{relatedWP.description}</p>
                    <ul>
                      <li>{camelPad(workProductToFind.split('.')[1])}</li>
                    </ul>
                  </Card>
                )
              })}
            </div>
          </div>
          <div key={2} className={styles['element']}>
            <h5>Completion Criterions</h5>
            <div className={styles['card-deck']}>
              {activity.completionCriterions.alphas.map((alphaToFind, i) => {
                const relatedAlpha = methodChunk.alphas.find(a => alphaToFind.includes(a.nameId));
                return (
                  <Card
                    className={styles['card']} 
                    key={i}
                    link={`${link}/alpha/${relatedAlpha.nameId}`}
                  >
                    <img alt='alpha logo' src={alphaImg} />
                    <h6>{relatedAlpha.name}</h6>
                    <p>{truncateString(relatedAlpha.description, 65)}</p>
                    <ul>
                      <li>{camelPad(alphaToFind.split('.')[1])}</li>
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
                  <Card className={styles['card']} key={i}>
                    <img alt='workproduct logo' src={workProductImg} />
                    <h6>{relatedWP.name}</h6>
                    <p>{relatedWP.description}</p>
                    <ul>
                      <li>{camelPad(workProductToFind.split('.')[1])}</li>
                    </ul>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles['states']}>
          <div className={styles['activity-space']}>
            <h5>Activity Space</h5>
            {activitySpaces.map(activitySpace => (
              <div key={activitySpace.nameId}>
                <img src={activitySpaceImg} alt="activity space logo"/>
                <h6>{activitySpace.name}</h6>
                <p>{activitySpace.description}</p>
              </div>
            ))}
          </div>
          <div className={styles['relations']}>
            <h5>Required</h5>
            <div className={styles['required']}>
              {activity.competencies.map((competency, i) => (
                <div key={i}>
                  <img src={competencyImg} alt="competency logo"/>
                  <h6>{camelPad(competency.split('.')[0])} level {competency.split('.')[1]}</h6>
                </div>
              ))}
            </div>
            <h5>Related</h5>
            <div className={styles['related']}>
              {relatedPatterns.map((pattern, i) => (
                <div key={i}>
                  <img src={patternImg} alt="pattern logo"/>
                  <h6>{pattern.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}