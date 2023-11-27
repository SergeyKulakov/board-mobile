import React from 'react'
import PropTypes from 'prop-types'

import { Container, NavigationElement } from './style'

const Navigation = ({ activeScreen }) => {
  return (
    <Container>
      <NavigationElement active={activeScreen === 0} />
      <NavigationElement active={activeScreen === 1} />
      <NavigationElement active={activeScreen === 2} />
      <NavigationElement active={activeScreen === 3} />
    </Container>
  )
}

Navigation.propTypes = {
  activeScreen: PropTypes.number.isRequired,
}

export { Navigation }
