import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import { RootStyle } from './style'

const Choices = ({ choices, onAnswerSelection, clearSelection, indexOfCorrectAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    if (clearSelection) setSelectedIndex(-1)
  }, [clearSelection])

  const handleChoiceClick = choiceIndex => {
    if (selectedIndex === -1) {
      onAnswerSelection(choiceIndex)
      setSelectedIndex(choiceIndex)
    }
  }

  return (
    <RootStyle>
      {choices && choices.map((choice, index) => (
        <Button
          key={index}
          onClick={() => handleChoiceClick(index)}
          data-testid={`choice-${index + 1}`}
          disabled={selectedIndex !== -1}
          isAnswered={selectedIndex !== -1}
          isActive={selectedIndex === index}
          isCorrectAnswer={indexOfCorrectAnswer === index}
        >
          {decodeURIComponent(choice)}
        </Button>
      ))
      }
    </RootStyle>
  )
}

Choices.propTypes = {
  choices: PropTypes.array.isRequired,
  onAnswerSelection: PropTypes.func.isRequired,
  shouldResetSelIndex: PropTypes.bool.isRequired,
  indexOfCorrectAnswer: PropTypes.number.isRequired
}

export default Choices
