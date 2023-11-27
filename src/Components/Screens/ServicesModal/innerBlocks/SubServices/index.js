import React from 'react'
import PropTypes from 'prop-types'

import { ServicesList } from 'Components/Blocks'
import { Container } from './style'

const SubServices = ({
  text,
  data,
  activeItems,
  disabledItems,
  isEditMode,
  changedItemId,
  onClickItem,
}) => {
  return (
    <Container>
      <ServicesList
        getServiceTitle={text.getServiceTitle}
        activeItems={activeItems}
        disabledItems={disabledItems}
        title={text.subServices}
        isEditMode={isEditMode}
        changedItemId={changedItemId}
        data={data}
        onClickItem={onClickItem}
      />
    </Container>
  )
}

SubServices.propTypes = {
  data: PropTypes.array,
  text: PropTypes.object.isRequired,
  activeItems: PropTypes.array,
  disabledItems: PropTypes.array,
  isEditMode: PropTypes.bool,
  changedItemId: PropTypes.string,
  onClickItem: PropTypes.func.isRequired,
}

export { SubServices }
