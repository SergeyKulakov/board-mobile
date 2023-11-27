import React from 'react'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'
import _ from 'lodash'

import { FlatList } from 'react-native'
import { ShadowBox } from 'Components/UI'
import { ListItem } from './innerBlocks'
import { ListContainer, ListItemContainer, styles } from './style'

const ServicesList = ({
  title,
  data,
  activeItemId,
  activeItems,
  disabledItems,
  changedItemId,
  onClickItem,
  horizontal,
  numColumns,
  orientation,
  isSelectedAll,
  withShadowBox,
  getServiceTitle,
  onSelectAll,
}) => {
  let result = data

  if (_.isFunction(onSelectAll))
    result = [
      {
        _id: 'all',
        isActive: isSelectedAll,
        title: 'All',
        iconName: 'All.png',
        isChanged: false,
        onClick: onSelectAll,
      },
      ...data,
    ]

  let _numColumn
  if (_.isNumber(numColumns)) {
    _numColumn = numColumns
  } else if (DeviceInfo.isTablet()) {
    if (orientation === 'PORTRAIT') _numColumn = 5
    if (orientation === 'LANDSCAPE') _numColumn = 8
  } else {
    if (orientation === 'PORTRAIT') _numColumn = 3
    if (orientation === 'LANDSCAPE') _numColumn = 5
  }

  const _renderContent = () => (
    <ListContainer mt={withShadowBox && 20}>
      <FlatList
        horizontal={horizontal}
        numColumns={horizontal ? undefined : _numColumn}
        keyExtractor={item => String(item._id)}
        listKey="ServicesList"
        key={orientation === 'PORTRAIT' ? 'h' : 'v'}
        extraData={[activeItemId, activeItems.length, changedItemId]}
        data={result}
        renderItem={({ item }) => {
          const isActive =
            activeItemId === item._id ||
            (activeItems.length &&
              activeItems.find(
                el => el.categoryId === item._id || el._id === item._id,
              )) ||
            item.isActive

          const isDisabled =
            changedItemId !== item._id &&
            disabledItems.find(el => el._id === item._id)
          return (
            <ListItemContainer>
              <ListItem
                getText={getServiceTitle}
                isActive={Boolean(isActive)}
                title={item.title}
                isChanged={changedItemId === item._id}
                isShowFolderIcon={!_.isEmpty(item.subservices)}
                disabled={isDisabled}
                iconName={item.iconName}
                onClick={() =>
                  _.isFunction(item.onClick)
                    ? item.onClick()
                    : onClickItem(item)
                }
              />
            </ListItemContainer>
          )
        }}
      />
    </ListContainer>
  )

  if (withShadowBox) {
    return (
      <ShadowBox style={styles.ShadowBox}>
        <ShadowBox.Title style={styles.Title}>
          {title[0].toUpperCase()}
          {title.slice(1)}
        </ShadowBox.Title>
        {_renderContent()}
      </ShadowBox>
    )
  }

  return _renderContent()
}

ServicesList.propTypes = {
  horizontal: PropTypes.bool,
  data: PropTypes.array,
  withShadowBox: PropTypes.bool,
  orientation: PropTypes.string,
  changedItemId: PropTypes.string,
  numColumns: PropTypes.number,
  activeItemId: PropTypes.string,
  disabledItems: PropTypes.array,
  activeItems: PropTypes.array,
  title: PropTypes.string.isRequired,
  isSelectedAll: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired,
  getServiceTitle: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func,
}

ServicesList.defaultProps = {
  horizontal: false,
  disabledItems: [],
  activeItems: [],
  activeItemId: '',
  withShadowBox: true,
}

export default ServicesList
