import styled, { keyframes } from 'styled-components'

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  border: 16px solid var(--grey-light);
  border-radius: 50%;
  border-top: 16px solid var(--grey-dark);
  width: 120px;
  margin: auto;
  height: 120px;
  animation: ${spinAnimation} 2s linear infinite;
`

export default Spinner
