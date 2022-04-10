import styled from 'styled-components'

export const Paragraph = styled.p`
  margin: 0;
`

export const Heading1 = styled.h1`
  font-size: ${(props) => props.size || '2em'};
  font-weight: ${(props) => props.weight || 'bold'};
  color: ${(props) => props.color || '#000'};
  margin: 0;
  font-weight: 400;
  margin-bottom: 5px;
  opacity: 0.7;
`
