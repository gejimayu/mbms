import React from 'react';

export default (props) => {
  const { alphas, match: { params: { name_id: alphaId } } } = props;
  if (!alphas || !alphaId) return null;

  const alpha = alphas.find(a => a.nameId === alphaId)

  return <h1>{alpha.name}</h1>
}