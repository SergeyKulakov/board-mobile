import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getSearchData } from 'Helpers/currency'
import { FlatList } from 'react-native'
import memoize from 'memoize-one'

import { Header, ListItem } from './innerBlocks'
import { Container } from './style'

class CountriesCurrencyModal extends PureComponent {
  state = {
    value: '',
  }

  getSearchProps = memoize((value, t) => ({
    value,
    onChange: this.handleSearchChange,
    placeholder: t('homePage.searchHere'),
  }))

  handleSearchChange = text => this.setState({ value: text })

  handleExit = () => {
    const { onCancel, navigate } = this.props

    if (_.isFunction(onCancel)) onCancel()
    navigate.hideModal()
  }

  handleSelect = value => {
    const { onSubmit, navigate } = this.props

    onSubmit(value)
    navigate.hideModal()
  }

  _renderItem = ({ item }) => {
    const { activeCode } = this.props

    return (
      <ListItem
        isActive={item.code === activeCode}
        name={item.country}
        code={item.code}
        onClick={memoize(() => this.handleSelect(item))}
      />
    )
  }

  render() {
    const { t } = this.props
    const { value } = this.state

    const searchProps = this.getSearchProps(value, t)

    return (
      <Container>
        <Header onClickBack={this.handleExit} searchProps={searchProps} />
        <FlatList
          renderItem={this._renderItem}
          data={getSearchData(value)}
          keyExtractor={(item, index) => index}
        />
      </Container>
    )
  }
}

CountriesCurrencyModal.propTypes = {
  activeCode: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  navigate: PropTypes.object,
  t: PropTypes.func,
}

export default CountriesCurrencyModal
