import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { FlagIcon } from 'Components/UI'

import { Container, Text, Content, Block } from './style'

const ListItem = ({ item, onPressItem, t }) => (
  <TouchableOpacity onPress={() => onPressItem(item.type)}>
    <Container>
      <Block isLeft={true} />
      <Content>
        <FlagIcon fileName={item.flag} />
        <Text isActive={item.isActive}>{t(`languages.${item.name}`)}</Text>
      </Content>
      <Block />
    </Container>
  </TouchableOpacity>
)

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  t: PropTypes.func,
  onPressItem: PropTypes.func.isRequired,
}

export default ListItem
