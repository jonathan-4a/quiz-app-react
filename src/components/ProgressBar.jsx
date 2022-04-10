import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const ProgressBarStyle = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.percent}%;
  background-color: ${props => props.backgroundColor};
  left: ${props => props.left}px;
  position: absolute;
  top: 0;
`

const ProgressBar = (props) => (
  <ProgressBarStyle {...props} />
)

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired
}

export default ProgressBar
