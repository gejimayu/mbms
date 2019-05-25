import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TreeView from '../components/treeview';

export default (props) => {
  const { methodChunk, type, nameId: elementNameId } = props;
  console.log(type, elementNameId)
  if (!methodChunk) return null;

  // return leaf node in treee view.
  // element is object essence with atleast name and nameId
  const nodeLabel = (element) => (
    <span className={(element.nameId === elementNameId) ? 'chosen' : ''}>{element.name}</span>
  )
  
  const renderPattern = (pattern) => {
    if (!pattern.subpatterns.length) {
      return (
        <Link key={pattern.nameId} to={`${link}/pattern/${pattern.nameId}`}>
          <div className={(pattern.nameId === elementNameId) ? 'chosen' : ''}>
            {pattern.name}
          </div>
        </Link>
      )
    }
    return (
      <TreeView key={pattern.nameId} nodeLabel={nodeLabel(pattern)} link={`${link}/pattern/${pattern.nameId}`}>
        { pattern.subpatterns.map((subpattern, i) => (
          renderPattern(subpattern)
        ))}
      </TreeView>
    )
  }

  const renderAlpha = (alpha) => {
    if (!alpha.subalphas.length) {
      return (
        <Link key={alpha.nameId} to={`${link}/alpha/${alpha.nameId}`}>
          <div className={(alpha.nameId === elementNameId) ? 'chosen' : ''}>
            {alpha.name}
          </div> 
        </Link>
      )
    }
    return (
      <TreeView key={alpha.nameId} nodeLabel={nodeLabel(alpha)} link={`${link}/alpha/${alpha.nameId}`}>
        { alpha.subalphas.map((subalpha, i) => (
          renderAlpha(subalpha)
        ))}
      </TreeView>
    )
  }

  const link = `/method-chunk/${methodChunk.nameId}`;

  return (
    <Styles>
      <TreeView nodeLabel={nodeLabel(methodChunk)} link={link}>
        <TreeView key='alpha' nodeLabel={nodeLabel({ name: 'Alphas' })} >
          { methodChunk.alphas.map(a => renderAlpha(a)) }
        </TreeView>
        <TreeView key='activity-space' nodeLabel={nodeLabel({ name: 'Activity Spaces' })}>
          {methodChunk.activitySpaces.map(activitySpace => {
            const activitySpaceLabel = <span className="node">{activitySpace.name}</span>;
            return (
              <TreeView key={activitySpace.nameId} nodeLabel={activitySpaceLabel} >
                {activitySpace.activities.map(activity => {
                  return (
                    <Link key={activity.nameId} to={`${link}/activity/${activity.nameId}`}>
                      <div className={(activity.nameId === elementNameId) ? 'chosen' : ''}>
                        {activity.name}
                      </div>  
                    </Link>
                  )
                })}
              </TreeView>
            );
          })}
        </TreeView>
        <TreeView key='competency' nodeLabel={nodeLabel({ name: 'Competencies' })} >
          {methodChunk.competencies.map(competency => (
            <Link key={competency.nameId} to={`${link}/competency/${competency.nameId}`}>
              <div className={(competency.nameId === elementNameId) ? 'chosen' : ''}>
                {competency.name}
              </div>
            </Link>
          ))}
        </TreeView>
        <TreeView key='pattern' nodeLabel={nodeLabel({ name: 'Pattern' })} >
          { methodChunk.patterns.map(p => renderPattern(p)) }
        </TreeView>
      </TreeView>
    </Styles>
  )
}

const Styles = styled.div`
  height: 80vh;
  width: 30vw;
  font-size: 0.9em;
  font-family: Arial;
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
  .chosen {
    color: red;
  }
`