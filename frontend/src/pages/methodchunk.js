import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/card';
import styles from './methodchunk.module.scss';
import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import competencyImg from '../assets/competency.png';
import patternImg from '../assets/pattern.png';

export default (props) => {
  const { methodChunk, match } = props;
  
  if (!methodChunk) return null;
  
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h4>{methodChunk.name}</h4>  
      </div>
      <div className={styles['desc']}>
        <p>{methodChunk.description}</p>
      </div>
      <div className={styles['element']}>
        <p>Characteristics</p>
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
      <div className={styles['element']}>
        <p>Alphas</p>
        <div className={styles['card-deck']}>
          {methodChunk.alphas.map(alpha => (
            <Link key={alpha.nameId} to={`${match.url}/alpha/${alpha.nameId}`}>
              <Card className={styles['card']}>
                <img alt='alpha logo' src={alphaImg} />
                <p>{alpha.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <p>Activities</p>
        <div className={styles['card-deck']}>
          {methodChunk.activitySpaces.map(activitySpace => (
            activitySpace.activities && activitySpace.activities.map(activity => (
              <Link key={activity.nameId} to={`${match.url}/activity/${activity.nameId}`}>
                <Card className={styles['card']}>
                  <img alt='activity logo' src={activityImg} />
                  <p>{activity.name}</p>
                </Card>
              </Link>
            )) 
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <p>Competencies</p>
        <div className={styles['card-deck']}>
          {methodChunk.competencies && methodChunk.competencies.map(competency => (
            <Link key={competency.nameId} to={`${match.url}/competency/${competency.nameId}`}>
              <Card className={styles['card']}>
                <img alt='competency logo' src={competencyImg} />
                <p>{competency.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles['element']}>
        <p>Patterns</p>
        <div className={styles['card-deck']}>
          {methodChunk.patterns && methodChunk.patterns.map(pattern => (
            <Link key={pattern.nameId} to={`${match.url}/pattern/${pattern.nameId}`}>
              <Card className={styles['card']}>
                <img alt='pattern logo' src={patternImg} />
                <p>{pattern.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}