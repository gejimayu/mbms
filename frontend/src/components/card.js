import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Card = styled.div`
  margin: 4px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 1rem;
  text-align: center;
`

const CardWithShadow = styled(Card)`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  &:hover, &:active {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    margin-top: -5px;
    margin-bottom: 12px;
  }
`

export default (props) => {
  const { link, className, children } = props;
  if (link) {
    return (
      <Link to={link}>
        <CardWithShadow className={className}>
          {children}
        </CardWithShadow>
      </Link>
    )
  }
  return (
    <Card className={className}>
      {children}
    </Card>
  )
};