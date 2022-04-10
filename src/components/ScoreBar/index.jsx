import React from 'react'
import PropTypes from 'prop-types'

import {
  ScoreBarStyle,
  ScoreStatusStyle
} from './style'

import ProgressBar from 'components/ProgressBar'
import { Paragraph } from 'components/Typography'

const ScoreBar = ({ currentScore, maximumPotentialScore, minimumPotentialScore }) => {
  return (
    <>
      <ScoreStatusStyle justifyContent='space-between'>
        <Paragraph data-testid='current-score-val'>Score: {currentScore}%</Paragraph>
        <Paragraph data-testid='max-score-val'>Max Score: {maximumPotentialScore}%</Paragraph>
      </ScoreStatusStyle>
      <ScoreBarStyle data-testid='full-score'>
        <ProgressBar
          backgroundColor='var(--grey-light)'
          height={24}
          percent={maximumPotentialScore}
          data-testid='max-score'
        />
        <ProgressBar
          backgroundColor='var(--grey-dark)'
          height={24}
          percent={currentScore}
          data-testid='current-score'
        />
        <ProgressBar
          backgroundColor='black'
          height={24}
          percent={minimumPotentialScore}
          data-testid='min-score'
        />
      </ScoreBarStyle>
    </>
  )
}

ScoreBar.propTypes = {
  currentScore: PropTypes.number.isRequired,
  maximumPotentialScore: PropTypes.number.isRequired,
  minimumPotentialScore: PropTypes.number.isRequired
}

export default ScoreBar
