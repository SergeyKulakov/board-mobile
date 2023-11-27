import React from 'react'
import PropTypes from 'prop-types'
import { languages } from 'Constants/languages'

import { FlatList } from 'react-native'
import { Modal } from 'Components/UI'
import { ListItem } from './innerBlocks'

import { Container } from './style'

const LanguagesModal = ({
  activeLanguage,
  orientation,
  visible,
  onSetLanguage,
  onCloseModal,
  onChangeLanguage,
}) => {
  if (!visible) return null
  const data = languages.map(el =>
    el.type === activeLanguage ? { ...el, isActive: true } : { ...el },
  )

  return (
    <Modal
      visible={visible}
      onCancelPress={onCloseModal}
      onConfirmPress={onSetLanguage}
    >
      <Container isHorizontal={orientation === 'LANDSCAPE'}>
        <FlatList
          keyExtractor={item => item.type}
          initialNumToRender={data.length}
          extraData={activeLanguage}
          data={data}
          renderItem={({ item }) => (
            <ListItem item={item} onPressItem={onChangeLanguage} />
          )}
        />
      </Container>
    </Modal>
  )
}

LanguagesModal.propTypes = {
  activeLanguage: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  onSetLanguage: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
}

export default LanguagesModal
