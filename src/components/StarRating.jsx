import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import rateIcon from 'assets/rate.png'

const StarStyle = styled.img`
  height: 12px;
  width: 12px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`

const StarRating = ({ rating, total }) => {
  if (total < rating) {
    throw new Error('Total stars cannot be less than rating')
  }

  return (
    <div>
      {Array(total)
        .fill(1)
        .map((_, index) => (
          <StarStyle
            data-testid={index >= rating ? 'grey-star' : 'bold-star'}
            src={rateIcon}
            key={`bold-${index}`}
            alt={`Star ${index + 1}`}
            disabled={index >= rating}
          />
        ))}
    </div>
  )
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default StarRating
