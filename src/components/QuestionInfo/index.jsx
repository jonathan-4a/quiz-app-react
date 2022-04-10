import React from 'react'
import PropTypes from 'prop-types'

import { Heading1 } from 'components/Typography'
import { Span } from './style'
import StarRating from 'components/StarRating'

const TOTAL_STAR = 3

const QuestionInfo = ({ difficultyLevel, questionNumber, questionCategory, questionsTotal }) => {
  return (
    <>
      <Heading1>
        Question {questionNumber} of {questionsTotal}
      </Heading1>
      <Span data-testid='category'>{questionCategory}</Span>
      <StarRating rating={difficultyLevel} total={TOTAL_STAR} />
    </>
  )
}

QuestionInfo.propTypes = {
  difficultyLevel: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questionCategory: PropTypes.string.isRequired,
  questionsTotal: PropTypes.number.isRequired
}

export default QuestionInfo
