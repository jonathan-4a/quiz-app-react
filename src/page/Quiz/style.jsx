import styled from 'styled-components'

import Button from 'components/Button'
import Flex from 'components/Flex'
import mediaQueries from 'utils/mediaQueries'

export const ResponseStyle = styled(Flex)`
${mediaQueries.mobile`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`}
`
export const NextButonStyle = styled(Button)`
  padding: 8px;
  ${mediaQueries.mobile`
    width: 150px;
  `}
`
export const ResultStyle = styled.h1`
  font-weight: 400;
`

export const Container = styled(Flex)`
  border: 5px solid #ededed;
  border-top-width: 8px;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 60px;
  padding-bottom: 20px;
  max-width: 700px;
  margin: 0 auto;
  height: 100%;
`

export const Header = styled.div`
  margin-bottom: 50px;
`
