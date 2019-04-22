import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/card';
import styles from './pattern.module.scss'
import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';
import { truncateString } from '../utils/string';

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
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h4>{pattern.name}</h4>  
      </div>
      <div className={styles['desc']}>
        <p>{pattern.description}</p>
      </div>
      <div className={styles['content']}>
        <div className={styles['contain']}>
          <div key={1} className={styles['element']}>
            <h5>Related To</h5>
            <div className={styles['card-deck']}>
              {relatedAlphas.map(alpha => (
                <Card className={styles['card']} key={alpha.nameId}>
                  <img alt='alpha logo' src={alphaImg} />
                  <h6>{alpha.name}</h6>
                  <p>{truncateString(alpha.description)}</p>
                </Card>
              ))}
              {relatedActivities.map(activity => (
                <Card className={styles['card']} key={activity.nameId}>
                  <img alt='activity lgoo' src={activityImg} />
                  <h6>{activity.name}</h6>
                  <p>{truncateString(activity.description)}</p>
                </Card>
              ))}
              {relatedCompetencies.map(competency => (
                <Card className={styles['card']} key={competency.nameId}>
                  <img alt='competency logo' src={competencyImg} />
                  <h6>{competency.name}</h6>
                  <p>{truncateString(competency.description)}</p>
                </Card>
              ))}
            </div>
          </div>
          <div key={2} className={styles['element']}>
            <h5>Contains</h5>
            <div className={styles['card-deck']}>
              {pattern.subpatternIds.map(subpatternId => {
                const relatedPattern = patterns.find(p => p.nameId === subpatternId);
                return (
                  <Card className={styles['card']} key={relatedPattern.nameId}>
                    <img alt='pattern logo' src={patternImg} />
                    <h6>{relatedPattern.name}</h6>
                    <p>{truncateString(relatedPattern.description)}</p>
                  </Card>
                );
              })}
              {pattern.subpatternIds.map(subpatternId => {
                const relatedPattern = patterns.find(p => p.nameId === subpatternId);
                return (
                  <Card className={styles['card']} key={relatedPattern.nameId}>
                    <img alt='pattern logo' src={patternImg} />
                    <h6>{relatedPattern.name}</h6>
                    <p>{truncateString(relatedPattern.description)}</p>
                  </Card>
                );
              })}
              {pattern.subpatternIds.map(subpatternId => {
                const relatedPattern = patterns.find(p => p.nameId === subpatternId);
                return (
                  <Card className={styles['card']} key={relatedPattern.nameId}>
                    <img alt='pattern logo' src={patternImg} />
                    <h6>{relatedPattern.name}</h6>
                    <p>{truncateString(relatedPattern.description)}</p>
                  </Card>
                );
              })}
              {pattern.subpatternIds.map(subpatternId => {
                const relatedPattern = patterns.find(p => p.nameId === subpatternId);
                return (
                  <Card className={styles['card']} key={relatedPattern.nameId}>
                    <img alt='pattern logo' src={patternImg} />
                    <h6>{relatedPattern.name}</h6>
                    <p>{truncateString(relatedPattern.description)}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}