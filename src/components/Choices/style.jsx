import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries'

export const RootStyle = styled.div`
  padding: 24px 0px;
  width: 100%;
  margin: 8px 0px;
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mediaQueries.tablet`
    justify-content: center;
  `}
`

export const TextChoiceStyle = styled.p`
  margin: 0px;
`
