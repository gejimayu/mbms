import React from 'react';
import styled from 'styled-components';

import TreeView from './treeview';

export default (props) => {
  const methodChunk = props.methodChunk;

  const methodLabel = <span className="node">{methodChunk.name}</span>;
  const alphasLabel = <span className="node">Alphas</span>;
  const activitySpacesLabel = <span className="node">Activity Spaces</span>;
  const competenciesLabel = <span className="node">Competencies</span>;
  const patternsLabel = <span className="node">Patterns</span>;

  return (
    <Styles>
      <TreeView nodeLabel={methodLabel} defaultCollapsed={false}>
        <TreeView key='alpha' nodeLabel={alphasLabel} defaultCollapsed={false}>
          {methodChunk.alphas && methodChunk.alphas.map(alpha => {
            return <div key={alpha.nameId}  className="info">{alpha.name}</div>
          })}
          {methodChunk.alphas && methodChunk.alphas.map(alpha => {
            return <div key={alpha.nameId}  className="info">{alpha.name}</div>
          })}
          {methodChunk.alphas && methodChunk.alphas.map(alpha => {
            return <div key={alpha.nameId}  className="info">{alpha.name}</div>
          })}
        </TreeView>
        <TreeView key='activity-space' nodeLabel={activitySpacesLabel} defaultCollapsed={false}>
          {methodChunk.activitySpaces && methodChunk.activitySpaces.map(activitySpace => {
            const activitySpaceLabel = <span className="node">{activitySpace.name}</span>;
            return (
              <TreeView key={activitySpace.nameId} nodeLabel={activitySpaceLabel} defaultCollapsed={false}>
                {activitySpace.activities.map(activity => {
                  return <div key={activity.nameId} className="info">{activity.name}</div>
                })}
              </TreeView>
            );
          })}
        </TreeView>
        <TreeView key='competency' nodeLabel={competenciesLabel} defaultCollapsed={false}>
          {methodChunk.competencies && methodChunk.competencies.map(competency => (
            <div key={competency.nameId} className="info">{competency.name}</div>
          ))}
        </TreeView>
        <TreeView key='pattern' nodeLabel={patternsLabel} defaultCollapsed={false}>
          {methodChunk.patterns && methodChunk.patterns.map(pattern => (
            <div key={pattern.nameId} className="info">{pattern.name}</div>
          ))}
        </TreeView>
      </TreeView>
    </Styles>
  )
}

const Styles = styled.div`
  width: 25%;
  height: 80vh;
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