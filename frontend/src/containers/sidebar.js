import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TreeView from '../components/treeview';

export default (props) => {
  const { methodChunk } = props;
  if (!methodChunk) return null;
  const link = `/method-chunk/${methodChunk.nameId}`;

  const nodeLabel = (name) => (
    <span className="node">{name}</span>
  )
  
  const renderPattern = (pattern) => {
    if (!pattern.subpatterns.length) {
      return (
        <Link to={`${link}/pattern/${pattern.nameId}`}>
          <div key={pattern.nameId} className="info">{pattern.name}</div>
        </Link>
      )
    }
    return (
      <TreeView key={pattern.nameId} nodeLabel={nodeLabel(pattern.name)}  link={`${link}/pattern/${pattern.nameId}`}>
        { pattern.subpatterns.map((subpattern, i) => (
          renderPattern(subpattern)
        ))}
      </TreeView>
    )
  }

  const renderAlpha = (alpha) => {
    if (!alpha.subalphas.length) {
      return (
        <Link to={`${link}/alpha/${alpha.nameId}`}>
          <div key={alpha.nameId}  className="info">{alpha.name}</div> 
        </Link>
      )
    }
    return (
      <TreeView key={alpha.nameId} nodeLabel={nodeLabel(alpha.name)} link={`${link}/alpha/${alpha.nameId}`}>
        { alpha.subalphas.map((subalpha, i) => (
          renderAlpha(subalpha)
        ))}
      </TreeView>
    )
  }

  return (
    <Styles>
      <TreeView nodeLabel={nodeLabel(methodChunk.name)} link={link}>
        <TreeView key='alpha' nodeLabel={nodeLabel('Alphas')} >
          { methodChunk.alphas.map(a => renderAlpha(a)) }
        </TreeView>
        <TreeView key='activity-space' nodeLabel={nodeLabel('Activity Spaces')}>
          {methodChunk.activitySpaces.map(activitySpace => {
            const activitySpaceLabel = <span className="node">{activitySpace.name}</span>;
            return (
              <TreeView key={activitySpace.nameId} nodeLabel={activitySpaceLabel} >
                {activitySpace.activities.map(activity => {
                  return (
                    <Link to={`${link}/activity/${activity.nameId}`}>
                      <div key={activity.nameId} className="info">{activity.name}</div>  
                    </Link>
                  )
                })}
              </TreeView>
            );
          })}
        </TreeView>
        <TreeView key='competency' nodeLabel={nodeLabel('Competencies')} >
          {methodChunk.competencies.map(competency => (
            <Link to={`${link}/competency/${competency.nameId}`}>
              <div key={competency.nameId} className="info">{competency.name}</div>
            </Link>
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
`