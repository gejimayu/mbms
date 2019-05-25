import React from 'react';

import Card from '../../components/card';
import styles from './alpha.module.scss';
import alphaImg from '../../assets/alpha.svg';
import activityImg from '../../assets/activity.svg';
import workProductImg from '../../assets/workproduct.svg';
import patternImg from '../../assets/pattern.svg';
import { truncateString, camelPad } from '../../utils/string';
import { doesObjExistOnArray } from '../../utils/object';

export default (props) => {
  const { methodChunk, match } = props;
  const { alphas } = methodChunk;
  const { params: { name_id: alphaId } } = match;
  if (!methodChunk || !alphaId || !alphas) return null;
  const alpha = alphas.find(a => a.nameId === alphaId)
  if (!alpha) return null;
  
  let progressingActivity = []
  methodChunk.activitySpaces.forEach(activitySpace => {
    activitySpace.activities.forEach(activity => {
      activity.completionCriterions.alphas.forEach(progressed => {
        const nameIdProgressed = progressed.split('.')[0];
        if (nameIdProgressed === alpha.nameId && !doesObjExistOnArray(progressingActivity, activity, 'nameId')) {
          progressingActivity.push(activity);
        }
      })
    })
  })

  let relatedPatterns = []
  methodChunk.patterns.forEach(pattern => {
    pattern.alphas.forEach(related => {
      if (related === alpha.nameId) {
        relatedPatterns.push(pattern);
      }
    })
  })

  const link = `/method-chunk/${methodChunk.name}`

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>{alpha.name}</h3>  
      </div>
      <div className={styles['desc']}>
        <p>{alpha.description}</p>
      </div>
      <div className={styles['content']}>
        <div className={styles['contain']}>
          <div key={1} className={styles['element']}>
            <h4>Contains</h4>
            <div className={`${styles['card-deck']}`}>
              {alpha.subalphaIds && alpha.subalphaIds.map(subalphaId => {
                const subalpha = alphas.find(a => a.nameId === subalphaId);
                return (
                  <Card 
                    className={styles['card']} 
                    key={subalphaId}
                    link={`${link}/alpha/${subalpha.nameId}`}
                  >
                    <img alt='alpha logo' src={alphaImg} />
                    <h6>{subalpha.name}</h6>
                    <p>{truncateString(subalpha.description, 65)}</p>
                  </Card>
                )
              })}
            </div>
            <div className={`${styles['card-deck']} ${styles['card-deck--bigger']}`}>
              {alpha.workProducts && alpha.workProducts.map(workProduct => (
                <Card className={styles['card']} key={workProduct.nameId}>
                  <img alt='work product logo' src={workProductImg} />
                  <h6>{workProduct.name}</h6>
                  <p>{workProduct.description}</p>
                  <ul>
                    {workProduct.levelOfDetails.map((lod, i) => (
                      <li key={i}>{camelPad(lod)}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
          <div key={2} className={styles['element']}>
            <h4>Progressed By</h4>
            <div className={styles['card-deck']}>
              {progressingActivity && progressingActivity.map(activity => (
                <Card
                  className={styles['card']}
                  key={activity.nameId}
                  link={`${link}/activity/${activity.nameId}`}
                >
                  <img alt='activity logo' src={activityImg} />
                  <h6>{activity.name}</h6>
                  <p>{truncateString(activity.description, 65)}</p>
                </Card>
              ))}
            </div>
          </div>
          <div key={3} className={styles['element']}>
            <h4>Related Patterns</h4>
            <div className={styles['card-deck']}>
              {relatedPatterns && relatedPatterns.map(pattern => (
                <Card
                  className={styles['card']}
                  key={pattern.nameId}
                  link={`${link}/pattern/${pattern.nameId}`}
                >
                  <img alt='pattern logo' src={patternImg} />
                  <h6>{pattern.name}</h6>
                  <p>{truncateString(pattern.description, 65)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['states']}>
          <h4>States</h4>
          <ol>
            {alpha.states && alpha.states.map(state => (
              <li key={state.nameId} className={styles['state']}>
                <h6>{state.name}</h6>  
                <p>{state.description}</p>
                {state.checklists.map((checklist, i) => (
                  <div key={i} className={styles['checklist']}>
                    <input type="checkbox" checked/>
                    <p>{checklist}</p>
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}