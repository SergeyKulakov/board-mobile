import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, Icon, BackIcon, ScreenTitle } from 'Components/UI'

import { Container, Left, Middle, Right, styles } from './style'

class Header extends PureComponent {
  state = {
    isSearchShow: false,
  }

  handleShowSearch = () => this.setState({ isSearchShow: true })

  handleHideSearch = () => this.setState({ isSearchShow: false })

  render() {
    const { searchProps, onClickBack } = this.props
    const { isSearchShow } = this.state

    return (
      <ScreenHeader searchProps={isSearchShow ? searchProps : undefined}>
        <Container>
          <Left>
            <BackIcon onClick={onClickBack} />
          </Left>
          <Middle>
            <ScreenTitle style={styles.Title}>Select currency</ScreenTitle>
          </Middle>
          <Right>
            <Icon
              {...styles.SearchIcon}
              onClick={
                isSearchShow ? this.handleHideSearch : this.handleShowSearch
              }
            />
          </Right>
        </Container>
      </ScreenHeader>
    )
  }
}

Header.propTypes = {
  searchProps: PropTypes.shape({
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  onClickBack: PropTypes.func,
}

export { Header }
