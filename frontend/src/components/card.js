import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Card = styled.div`
  background-color: #f8f9fa;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 1rem;
`

export default (props) => {
  const { link, className, children } = props;
  console.log(link)
  if (link) {
    return (
      <Link to={link}>
        <Card className={className}>
          {children}
        </Card>
      </Link>
    )
  }
  return (
    <Card className={className}>
      {children}
    </Card>
  )
};