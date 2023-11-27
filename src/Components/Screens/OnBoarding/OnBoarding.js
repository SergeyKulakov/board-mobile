import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import { metrics } from 'Themes'

import { LanguageModal } from 'Components/Blocks'
import { GradientContainer } from 'Components/UI'

import { ScrollView } from 'react-native'

import { AutorizationBlock, ScrollBlock } from './innerBlocks'

import {
  Container,
  ScrollBlockContainer,
  AutorizationContainer,
  Wrapper,
} from './styles'

class OnBoarding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeScreen: 0,
      isModalOpen: false,
      activeLanguage: props.activeLanguage || i18n.locale,
    }
  }

  componentDidMount() {
    const { onSetSkipTutorial } = this.props
    onSetSkipTutorial()

    this.setState({ isModalOpen: true })
  }

  handleCloseLanguagesModal = () => this.setState({ isModalOpen: false })

  handleChangeLanguage = language => this.setState({ activeLanguage: language })

  handleSetLanguage = () => {
    const { onSetLanguage } = this.props
    const { activeLanguage } = this.state

    onSetLanguage(activeLanguage)
    this.handleCloseLanguagesModal()
  }

  handleScroll = index => this.setState({ activeScreen: index })

  _renderContent = () => {
    const { activeScreen } = this.state

    return (
      <>
        <ScrollBlockContainer isSmall={metrics.screenHeight < 650}>
          <ScrollBlock
            activeScreen={activeScreen}
            onChangeScrollNavigation={this.handleScroll}
          />
        </ScrollBlockContainer>
        <AutorizationContainer isSmall={metrics.screenHeight < 650}>
          <AutorizationBlock />
        </AutorizationContainer>
      </>
    )
  }

  render() {
    const { isModalOpen, activeLanguage } = this.state

    return (
      <GradientContainer>
        <Container>
          {metrics.screenHeight < 650 ? (
            <ScrollView>{this._renderContent()}</ScrollView>
          ) : (
            <Wrapper>{this._renderContent()}</Wrapper>
          )}
          <LanguageModal
            activeLanguage={activeLanguage}
            visible={isModalOpen}
            onCloseModal={this.handleCloseLanguagesModal}
            onChangeLanguage={this.handleChangeLanguage}
            onSetLanguage={this.handleSetLanguage}
          />
        </Container>
      </GradientContainer>
    )
  }
}

OnBoarding.propTypes = {
  onSetSkipTutorial: PropTypes.func.isRequired,
  onSetLanguage: PropTypes.func.isRequired,
  activeLanguage: PropTypes.string,
}

export default OnBoarding
