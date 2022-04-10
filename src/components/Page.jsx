import React, { useEffect } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

const Page = ({ title, children }) => {
  document.title = title

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      {children}
    </>
  )
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Page
