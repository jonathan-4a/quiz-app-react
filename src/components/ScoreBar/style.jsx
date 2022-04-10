import styled from 'styled-components'

import Flex from 'components/Flex'

export const ScoreBarStyle = styled.div`
  border: 1px solid black;
  height: 24px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`

export const ScoreStatusStyle = styled(Flex)`
  flex-grow: 1;
  margin-bottom: 5px;
`
