import React from 'react';

import styles from './competency.module.scss';

export default (props) => {
  const { methodChunk, match } = props;
  const { competencies } = methodChunk;
  const { params: { name_id: competencyId } } = match;
  if (!methodChunk || !competencyId || !competencies) return null;
  
  let competency = competencies.find(c => c.nameId === competencyId)
  if (!competency) return null;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>{competency.name}</h3>  
      </div>
      <div className={styles['desc']}>
        <p>{competency.description}</p>
      </div>
      <div className={styles['content']}>
        <h4>Levels</h4>
        <table>
          <tbody>
            {competency.levels.map((level, i) => (
              <tr key={i}>
                <td>{`Level ${i}`}</td>
                <td>{level.name}</td>
                <td>{level.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}