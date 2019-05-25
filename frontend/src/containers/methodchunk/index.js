import React from 'react';

import Card from '../../components/card';
import styles from './methodchunk.module.scss';
import alphaImg from '../../assets/alpha.svg';
import activityImg from '../../assets/activity.svg';
import competencyImg from '../../assets/competency.svg';
import patternImg from '../../assets/pattern.svg';

export default (props) => {
  const { methodChunk, match } = props;
  
  if (!methodChunk) return null;
  
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>{methodChunk.name}</h3>
      </div>
      <div className={styles['desc']}>
        <p>{methodChunk.description}</p>
      </div>
      <div className={styles['element']}>
        <h4>Alphas</h4>
        <div className={styles['card-deck']}>
          {methodChunk.alphas.map(alpha => (
            <Card className={styles['card']} key={alpha.nameId} link={`${match.url}/alpha/${alpha.nameId}`}>
              <img alt='alpha logo' src={alphaImg} />
              <p>{alpha.name}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <h4>Activities</h4>
        <div className={styles['card-deck']}>
          {methodChunk.activitySpaces.map(activitySpace => (
            activitySpace.activities && activitySpace.activities.map(activity => (
              <Card className={styles['card']} key={activity.nameId} link={`${match.url}/activity/${activity.nameId}`}>
                <img alt='activity logo' src={activityImg} />
                <p>{activity.name}</p>
              </Card>
            )) 
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <h4>Competencies</h4>
        <div className={styles['card-deck']}>
          {methodChunk.competencies && methodChunk.competencies.map(competency => (
            <Card className={styles['card']} key={competency.nameId} link={`${match.url}/competency/${competency.nameId}`}>
              <img alt='competency logo' src={competencyImg} />
              <p>{competency.name}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <h4>Patterns</h4>
        <div className={styles['card-deck']}>
          {methodChunk.patterns && methodChunk.patterns.map(pattern => (
            <Card className={styles['card']} key={pattern.nameId} link={`${match.url}/pattern/${pattern.nameId}`}>
              <img alt='pattern logo' src={patternImg} />
              <p>{pattern.name}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <h4>Characteristics</h4>
        <table>
          <thead>
            <tr>
              <th>Characteristic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {methodChunk.characteristics.map(c => (
              <tr key={c.characteristic}>
                <td>{c.characteristic}</td>
                <td>{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}