import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries'

const Button = styled.button`
  width: 200px;
  min-height: 40px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  font-weight: 600;
  color: ${props => (props.isActive ? 'white' : 'black')};
  background: ${props => props.isActive ? 'black' : (props.isCorrectAnswer && props.isAnswered) ? 'white' : 'var(--grey-light)'};
  :disabled {
    border: 1px solid black;
    opacity: ${props => (props.isActive || props.isCorrectAnswer) ? 1 : 0.5};
  }
  :not([disabled]) {
    :hover {
      background-color: var(--btn-hover);
      cursor: pointer;
    }
  }
  ${mediaQueries.mobile`
    width: 100%;
  `}
`

export default Button
