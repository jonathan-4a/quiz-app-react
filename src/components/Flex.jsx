import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'stretch'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
`
