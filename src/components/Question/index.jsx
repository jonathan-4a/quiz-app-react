import React from 'react'
import PropTypes from 'prop-types'

import { Paragraph } from 'components/Typography'
import { RootStyle } from './style'

const Question = ({ children }) => {
  return (
    <RootStyle>
      <Paragraph data-testid='question'>{decodeURIComponent(children)}</Paragraph>
    </RootStyle>
  )
}

Question.propTypes = {
  children: PropTypes.string.isRequired
}

export default Question
