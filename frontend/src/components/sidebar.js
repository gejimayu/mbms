import React from 'react';
import styled from 'styled-components';

import TreeView from './treeview';


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
  const methodChunk = props.methodChunk;
  if (!methodChunk) return null;
  
  // populate subalpha
  methodChunk.alphas = methodChunk.alphas.map(a => (
    alphaToTree(methodChunk.alphas, a)
  ))
  
  // populate subpattern
  methodChunk.patterns = methodChunk.patterns.map(p => (
    patternToTree(methodChunk.patterns, p)
  ));

  const nodeLabel = (name) => (
    <span className="node">{name}</span>
  )
  
  const renderPattern = (pattern) => {
    if (!pattern.subpatterns.length) {
      return <div key={pattern.nameId} className="info">{pattern.name}</div>
    }
    return (
      <TreeView key={pattern.nameId} nodeLabel={nodeLabel(pattern.name)} >
        { pattern.subpatterns.map((subpattern, i) => (
          renderPattern(subpattern)
        ))}
      </TreeView>
    )
  }

  const renderAlpha = (alpha) => {
    if (!alpha.subalphas.length) {
      return <div key={alpha.nameId}  className="info">{alpha.name}</div> 
    }
    return (
      <TreeView key={alpha.nameId} nodeLabel={nodeLabel(alpha.name)} >
        { alpha.subalphas.map((subalpha, i) => (
          renderAlpha(subalpha)
        ))}
      </TreeView>
    )
  }

  return (
    <Styles>
      <TreeView nodeLabel={nodeLabel(methodChunk.name)} >
        <TreeView key='alpha' nodeLabel={nodeLabel('Alphas')} >
          { methodChunk.alphas.map(a => renderAlpha(a)) }
        </TreeView>
        <TreeView key='activity-space' nodeLabel={nodeLabel('Activity Spaces')} >
          {methodChunk.activitySpaces.map(activitySpace => {
            const activitySpaceLabel = <span className="node">{activitySpace.name}</span>;
            return (
              <TreeView key={activitySpace.nameId} nodeLabel={activitySpaceLabel} >
                {activitySpace.activities.map(activity => {
                  return <div  key={activity.nameId} className="info">{activity.name}</div>
                })}
              </TreeView>
            );
          })}
        </TreeView>
        <TreeView key='competency' nodeLabel={nodeLabel('Competencies')} >
          {methodChunk.competencies.map(competency => (
            <div key={competency.nameId} className="info">{competency.name}</div>
          ))}
        </TreeView>
        <TreeView key='pattern' nodeLabel={nodeLabel('Pattern')} >
          { methodChunk.patterns.map(p => renderPattern(p)) }
        </TreeView>
      </TreeView>
    </Styles>
  )
}

const Styles = styled.div`
  height: 80vh;
  width: 30vw;
  font-size: 0.8em;
  padding: 0 16px;
  border-right: 1px solid black;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
`