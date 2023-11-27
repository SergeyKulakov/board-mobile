import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-native'
import { Dialog, MoreIcon } from 'Components/UI'

import {
  Container,
  Title,
  StatusInfo,
  InfoBlock,
  StatusInfoBlock,
  CloseIcon,
  IconContainer,
  switchStyle,
} from './style'

const ServiceItem = ({
  text,
  categoryTitle,
  isOpenDialog,
  isLastItem,
  title,
  status,
  onChangeStatus,
  onCloseDialog,
  onOpenDialog,
  onEdit,
  onDelete,
}) => {
  return (
    <Container isLastItem={isLastItem}>
      <InfoBlock>
        <Title>
          {categoryTitle ? `${text.getCategoryTitle(categoryTitle)} - ` : ''}
          {text.getCategoryTitle(title)}
        </Title>
        <StatusInfoBlock>
          <StatusInfo>
            {status === 'active' ? text.active : text.disable}
          </StatusInfo>
          <Switch
            value={status === 'active'}
            onValueChange={onChangeStatus}
            style={switchStyle}
          />
        </StatusInfoBlock>
      </InfoBlock>
      <IconContainer>
        {isOpenDialog ? (
          <CloseIcon onClick={onCloseDialog} />
        ) : (
          <MoreIcon onClick={onOpenDialog} />
        )}

        <Dialog
          isVisible={isOpenDialog}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onCloseDialog}
        />
      </IconContainer>
    </Container>
  )
}

ServiceItem.propTypes = {
  text: PropTypes.object.isRequired,
  categoryTitle: PropTypes.string,
  isOpenDialog: PropTypes.bool.isRequired,
  isLastItem: PropTypes.bool,
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
}

export { ServiceItem }
