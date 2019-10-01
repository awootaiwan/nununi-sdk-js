import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid transparent;
  border-color: #f5c6cb;
  margin: 1rem;
  padding: .75rem 1.25rem;
  border-radius: .25rem;
`;

const ErrorAlert = (data) => (
  <Div role="alert">
    {data.errmsg}  (請與管理者聯絡)
  </Div>
)

export default ErrorAlert
  
  