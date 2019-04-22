import React from 'react';

import Card from '../components/card';
import styles from './alpha.module.scss';
import alphaImg from '../assets/alpha.png';
import activityImg from '../assets/activity.png';
import workProductImg from '../assets/workproduct.png';
import patternImg from '../assets/pattern.png';
import { truncateString } from '../utils/string';

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
        if (progressed.includes(alpha.nameId)) {
          progressingActivity.push(activity);
        }
      })
    })
  })

  let relatedPatterns = []
  methodChunk.patterns.forEach(pattern => {
    pattern.alphas.forEach(related => {
      if (related.includes(alpha.nameId)) {
        relatedPatterns.push(pattern);
      }
    })
  })

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h4>{alpha.name}</h4>  
      </div>
      <div className={styles['desc']}>
        <p>{alpha.description}</p>
      </div>
      <div className={styles['content']}>
        <div className={styles['contain']}>
          <div key={1} className={styles['element']}>
            <h5>Contains</h5>
            <div className={styles['card-deck']}>
              {alpha.subalphaIds && alpha.subalphaIds.map(subalphaId => {
                const subalpha = alphas.find(a => a.nameId === subalphaId);
                return (
                  <Card className={styles['card']} key={subalphaId}>
                    <img alt='alpha logo' src={alphaImg} />
                    <h6>{subalpha.name}</h6>
                    <p>{truncateString(subalpha.description, 65)}</p>
                  </Card>
                )
              })}
              {alpha.workProducts && alpha.workProducts.map(workProduct => (
                <Card className={styles['card']} key={workProduct.nameId}>
                  <img alt='work product logo' src={workProductImg} />
                  <h6>{workProduct.name}</h6>
                  <p>{truncateString(workProduct.description, 65)}</p>
                </Card>
              ))}
            </div>
          </div>
          <div key={2} className={styles['element']}>
            <h5>Progressed By</h5>
            <div className={styles['card-deck']}>
              {progressingActivity && progressingActivity.map((activity,i) => (
                <Card className={styles['card']} key={i}>
                  <img alt='activity logo' src={activityImg} />
                  <h6>{activity.name}</h6>
                  <p>{truncateString(activity.description, 65)}</p>
                </Card>
              ))}
            </div>
          </div>
          <div key={3} className={styles['element']}>
            <h5>Related Patterns</h5>
            <div className={styles['card-deck']}>
              {relatedPatterns && relatedPatterns.map(pattern => (
                <Card className={styles['card']} key={pattern.nameId}>
                  <img alt='pattern logo' src={patternImg} />
                  <h6>{pattern.name}</h6>
                  <p>{truncateString(pattern.description, 65)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['states']}>
          <h5>States</h5>
          <ol>
            {alpha.states && alpha.states.map(state => (
              <li key={state.nameId} className={styles['state']}>
                <h6>{state.name}</h6>  
                <p>{state.description}</p>
                {state.checklists.map((checklist, i) => (
                  <div className={styles['checklist']}>
                    <input type="checkbox" checked/>
                    {checklist}
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