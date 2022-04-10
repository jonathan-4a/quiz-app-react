import React from 'react'
import styled from 'styled-components'

const SnackBarStyled = styled.div`
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  min-width: 250px;
  background-color: #444;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  z-index: 1;
  margin: auto;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  font-size: 17px;
  transition: visibility 0.5s linear;
`

const SnackBar = ({ open, children }) => {
  return (
    <SnackBarStyled open={open}>
      {children}
    </SnackBarStyled>
  )
}
export default SnackBar
