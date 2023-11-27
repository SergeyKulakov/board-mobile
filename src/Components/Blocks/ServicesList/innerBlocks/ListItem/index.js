import React from 'react'
import PropTypes from 'prop-types'
import { getServiceImage } from 'Helpers/getImageUri'

import { TouchableOpacity } from 'react-native'

import { Icon, Image } from 'Components/UI'

import {
  Container,
  Content,
  Title,
  ImageContainer,
  TitleContainer,
  FolderIconContainer,
  styles,
} from './style'

const ListItem = ({
  title,
  iconName,
  isActive,
  isChanged,
  getText,
  isShowFolderIcon,
  disabled,
  onClick,
}) => (
  <TouchableOpacity onPress={onClick} disabled={disabled}>
    <Container>
      <Content isActive={isActive} disabled={disabled}>
        <ImageContainer>
          <Image data={getServiceImage(iconName)} withLoading>
            <FolderIconContainer isChanged={isChanged}>
              {isChanged && <Icon {...styles.Icon} />}
              {isShowFolderIcon ? <Icon {...styles.FolderIcon} /> : null}
            </FolderIconContainer>
          </Image>
        </ImageContainer>
      </Content>
      <TitleContainer>
        <Title isActive={isActive}>{getText(title)}</Title>
      </TitleContainer>
    </Container>
  </TouchableOpacity>
)

ListItem.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isChanged: PropTypes.bool,
  isShowFolderIcon: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  getText: PropTypes.func.isRequired,
}

export { ListItem }
