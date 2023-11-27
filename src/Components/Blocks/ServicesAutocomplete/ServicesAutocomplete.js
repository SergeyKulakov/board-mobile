import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { filteredServices } from 'Helpers/services'
import { getServiceImage } from 'Helpers/getImageUri'
import _ from 'lodash'

import { FlatList } from 'react-native'

import { ScreenLoader } from '../ScreenLoader'
import { Container, SmallService } from './style'

class ServicesAutocomplete extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRequest: _.isEmpty(props.categories),
    }
  }

  componentDidMount() {
    const { categories } = this.props

    if (_.isEmpty(categories)) this.handleLoadCategories()
  }

  handleLoadCategories = () => {
    const { toast, onLoadCategories, getError } = this.props
    this.setState(prevProps =>
      !prevProps.isRequest ? { isRequest: true } : null,
    )
    onLoadCategories({
      callback: ({ error }) => {
        if (error && _.isFunction(toast)) toast(getError(error))
        this.setState({ isRequest: false })
      },
    })
  }

  renderItem = ({ item }) => {
    const { onSelect, t } = this.props
    return (
      <SmallService
        image={getServiceImage(item.iconName)}
        title={t(`services.${item.title}`)}
        onClick={() => _.isFunction(onSelect) && onSelect(item)}
      />
    )
  }

  render() {
    const { value, categories, activeLanguage } = this.props
    const { isRequest } = this.state

    if (_.isEmpty(value)) return null

    return (
      <Container>
        <FlatList
          keyExtractor={item => item._id}
          extraData={[activeLanguage]}
          data={_.isEmpty(value) ? [] : filteredServices(categories, value)}
          renderItem={this.renderItem}
        />
        <ScreenLoader visible={isRequest} />
      </Container>
    )
  }
}

ServicesAutocomplete.propTypes = {
  value: PropTypes.string,
  categories: PropTypes.array,
  onSelect: PropTypes.func,
  toast: PropTypes.func,
  onLoadCategories: PropTypes.func,
  t: PropTypes.func,
  activeLanguage: PropTypes.string,
  getError: PropTypes.func,
}

export default ServicesAutocomplete
