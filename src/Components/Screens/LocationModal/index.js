import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import _ from 'lodash'
import PlaceParser from 'Helpers/parse-google-places'
import { isIphoneX, isIos } from 'Helpers/iphoneX'

import { GooglePlacesAutocomplete } from './innerBlocks'

import { hitSlop } from './config'
import { Container, Header, TextBlock, Text, styles } from './style'

class LocationModal extends PureComponent {
  text = {
    cancel: i18n.t('jobPost.cancel'),
  }

  handleSelect = (data, details = null) => {
    const { onSave, navigate } = this.props

    let result = ''

    if (_.isString(data)) {
      result = data
    } else {
      result = PlaceParser(details)
    }

    navigate.hideModal()

    onSave(result)
  }

  render() {
    const { navigate } = this.props
    const { cancel } = this.text

    return (
      <Container>
        {isIphoneX() && <Header />}
        {!isIphoneX() && isIos() && <Header pt={20} />}
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus
          returnKeyType="search"
          listViewDisplayed="auto"
          fetchDetails
          // renderDescription={row => row.description}
          onPress={this.handleSelect}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyAOrI9daMiZzf1t2oPscaFD4FpPod4yTR8',
            language: 'en',
            types: 'address',
          }}
          styles={styles.GooglePlacesAutocomplete}
          // currentLocation
          // currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={
            {
              // types: 'address'
            }
          }
          debounce={200}
          renderRightButton={() => (
            <TextBlock hitSlop={hitSlop} onPress={navigate.hideModal}>
              <Text>{cancel}</Text>
            </TextBlock>
          )}
        />
      </Container>
    )
  }
}

LocationModal.propTypes = {
  value: PropTypes.string, // from passProps
  navigate: PropTypes.object, // from navigate HOC
  onSave: PropTypes.func, // from passProps
}

export default LocationModal
