import React from 'react'
import PropTypes from 'prop-types'
import { sortedService } from 'Helpers/services'

import { ScrollView } from 'react-native'
import { ServicesList } from 'Components/Blocks'

import { EmptyScreen } from '../index'
import { Container } from './style'

const Services = ({
  allData,
  popularData,
  text,
  onClickItem,
  filterValue,
  activeItems,
  disabledItems,
  changedItemId,
  isEditMode,
}) => {
  const listProps = {
    onClickItem,
    activeItems,
    disabledItems,
    changedItemId,
    isEditMode,
    getServiceTitle: text.getServiceTitle,
  }

  return allData.length ? (
    <ScrollView>
      <Container>
        {popularData.length ? (
          <ServicesList
            title={text.popular}
            data={sortedService(popularData)}
            horizontal
            getServiceTitle={text.getServiceTitle}
            {...listProps}
          />
        ) : null}
        <ServicesList
          title={text.all}
          data={allData}
          getServiceTitle={text.getServiceTitle}
          {...listProps}
        />
      </Container>
    </ScrollView>
  ) : (
    <EmptyScreen value={filterValue} />
  )
}

Services.propTypes = {
  text: PropTypes.object.isRequired,
  popularData: PropTypes.array.isRequired,
  allData: PropTypes.array.isRequired,
  onClickItem: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  activeItems: PropTypes.array,
  disabledItems: PropTypes.array,
  changedItemId: PropTypes.string,
  isEditMode: PropTypes.bool,
}

export { Services }
