import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'
import _ from 'lodash'

import { TouchableOpacity } from 'react-native'
import { ScreenHeader, InputSearch, BackIcon } from 'Components/UI'

import {
  Container,
  Left,
  Middle,
  InputSearchWrapper,
  Right,
  SearchText,
} from './style'

const Header = ({ value, onChange, onBackClick, onSubmit, ...props }) => {
  return (
    <ScreenHeader>
      <Container>
        <Left>
          <BackIcon onClick={onBackClick} />
        </Left>
        <Middle>
          <InputSearchWrapper>
            <InputSearch
              value={value}
              onChange={onChange}
              autoFocus
              onSubmit={onSubmit}
              {...props}
            />
          </InputSearchWrapper>
        </Middle>
        <Right>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={!value || _.isEmpty(value)}
          >
            <SearchText>{getTranslate('findJobPage.search')}</SearchText>
          </TouchableOpacity>
        </Right>
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  onBackClick: PropTypes.func,
}

export { Header }
