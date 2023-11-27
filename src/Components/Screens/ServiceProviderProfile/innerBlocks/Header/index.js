import React from 'react'
import PropTypes from 'prop-types'

import {
  ScreenHeader,
  HeartIcon,
  ShareIcon,
  BackIcon,
  Hamburger,
} from 'Components/UI'

import { Container, Left, Middle, Right, FirstIconWrapper } from './style'

const Header = ({
  isFavouriteLoading,
  isFavourite,
  isFavouriteDisable,
  onPop,
  onOpenSidebar,
  onClickFavourite,
  onClickShare,
  children,
}) => {
  return (
    <ScreenHeader>
      <Container>
        <Left>
          <FirstIconWrapper>
            <BackIcon onClick={onPop} />
          </FirstIconWrapper>
          <Hamburger onClick={onOpenSidebar} />
        </Left>
        <Middle>{children}</Middle>
        <Right>
          {isFavouriteDisable ? null : (
            <FirstIconWrapper>
              <HeartIcon
                isActive={isFavourite}
                onClick={onClickFavourite}
                loading={isFavouriteLoading}
              />
            </FirstIconWrapper>
          )}
          <ShareIcon onClick={onClickShare} />
        </Right>
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  isFavouriteLoading: PropTypes.bool,
  isFavourite: PropTypes.bool,
  isFavouriteDisable: PropTypes.bool,
  onClickFavourite: PropTypes.func,
  onClickShare: PropTypes.func,
  onOpenSidebar: PropTypes.func,
  onPop: PropTypes.func,
  children: PropTypes.node,
}

export { Header }
