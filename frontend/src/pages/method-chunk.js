import React from 'react';

export default (props) => {
  const { match } = props;
  return <h1>{match.params.name_id}</h1>
}