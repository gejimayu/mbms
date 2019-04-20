import React from 'react';
import styled from 'styled-components'

const Card = styled.div`
  background-color: #f8f9fa;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 1rem;
`

export default (props) => (
  <Card className='card'>
    {props.children}
  </Card>
);