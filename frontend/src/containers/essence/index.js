import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './essence.module.scss'
import Sidebar from '../sidebar';
const MethodChunk = React.lazy(() => import('../methodchunk'));
const Alpha = React.lazy(() => import('../alpha'));
const Activity = React.lazy(() => import('../activity'));
const Competency = React.lazy(() => import('../competency'));
const Pattern = React.lazy(() => import('../pattern'));

// populate subpatternIds of a pattern (2nd arg) with the real subpattern object
// based on listOfPattern (like a yellow book, where to look the subpattern object).
const patternToTree = (listOfPattern, pattern) => {
  pattern.subpatterns = [];
  pattern.subpatternIds.forEach(subpatternId => {
    let subpatternIdx = listOfPattern.findIndex(p => p.nameId === subpatternId);
    let subpattern = listOfPattern[subpatternIdx];
    subpattern = patternToTree(listOfPattern, subpattern);
    pattern.subpatterns.push(subpattern);
    listOfPattern.splice(subpatternIdx, 1);
  });
  return pattern;
}

// same as above, only for alpha.
const alphaToTree = (listOfAlpha, alpha) => {
  alpha.subalphas = [];
  alpha.subalphaIds.forEach(subalphaId => {
    let subalphaIdx = listOfAlpha.findIndex(p => p.nameId === subalphaId);
    let subalpha = listOfAlpha[subalphaIdx];
    subalpha = alphaToTree(listOfAlpha, subalpha);
    alpha.subalphas.push(subalpha);
    listOfAlpha.splice(subalphaIdx, 1);
  })
  return alpha;
}

export default (props) => {
  const { match } = props;
  const nameId = match.params.name_id; // method chunk name ID
  const [methodChunk, setMethodChunk] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/' + nameId)
      .then(response => response.json())
      .then(data => data.data)
      .then(methodChunk => setMethodChunk(methodChunk))
      .catch(err => alert(err))
  }, [])

  if (!methodChunk) return null;
  
  // deep copy methodChunk because we will mutate methodChunkTree in the process
  let methodChunkTree = JSON.parse(JSON.stringify(methodChunk));
  // populate subalpha
  methodChunkTree.alphas = methodChunkTree.alphas.map(a => (
    alphaToTree(methodChunkTree.alphas, a)
  ))
  // populate subpattern
  methodChunkTree.patterns = methodChunkTree.patterns.map(p => (
    patternToTree(methodChunkTree.patterns, p)
  ));

  const renderController = (type, props) => {
    const { params: { name_id: nameId } } = props.match; // element name ID
    let element;
    switch(type) {
      case 'alpha':
        element = <Alpha {...props} methodChunk={methodChunk} />;
        break;
      case 'activity':
        element = <Activity {...props} methodChunk={methodChunk} />;
        break;
      case 'competency':
        element = <Competency {...props} methodChunk={methodChunk} />;
        break;
      case 'pattern':
        element = <Pattern {...props} methodChunk={methodChunk} />;
        break;
      case 'methodChunk':
        element = <MethodChunk {...props} methodChunk={methodChunk} />;
        break;
      default:
        element = null;
    }
    return (
      <React.Fragment>
        <Sidebar className={styles['sidebar']} methodChunk={methodChunkTree} type={type} nameId={nameId} />
        {element}
      </React.Fragment>
    )
  }

  return (
    <div className={styles['main']}>
      <React.Suspense fallback={<p>Please Wait</p>}>
        <Switch>
          <Route
            key={1}
            path={`${match.path}/alpha/:name_id`}
            render={props => renderController('alpha', props)}
          />
          <Route
            key={2}
            path={`${match.path}/activity/:name_id`}
            render={props => renderController('activity', props)}
          />
          <Route
            key={3}
            path={`${match.path}/competency/:name_id`}
            render={props => renderController('competency', props)}
          />
          <Route
            key={4}
            path={`${match.path}/pattern/:name_id`}
            render={props => renderController('pattern', props)}
          />
          <Route
            key={5}
            path={`${match.path}`}
            render={props => renderController('methodChunk', props)}
          />
        </Switch>
      </React.Suspense>
    </div>
  )
}