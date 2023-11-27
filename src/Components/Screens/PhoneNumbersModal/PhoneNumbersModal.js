import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import phonesData, { getCodeByNumber } from 'Constants/phones'

import { FlatList } from 'react-native'
import { Button } from 'Components/UI'

import { PhoneRow, Header } from './innerBlocks'
import { Container, Content } from './style'

class PhoneNumbersModal extends PureComponent {
  constructor(props) {
    super(props)

    const activeCode = getCodeByNumber(props.value)

    this.state = {
      activeCode: activeCode || phonesData[0].code,
    }
  }

  handleSelect = code => this.setState({ activeCode: code })

  handleSubmit = () => {
    const { onSubmit, navigate } = this.props
    const { activeCode } = this.state

    const result = phonesData.find(el => el.code === activeCode)

    onSubmit(result.phone)
    navigate.hideModal()
  }

  renderItem = ({ item }) => {
    const { t } = this.props
    const { activeCode } = this.state

    return (
      <PhoneRow
        {...item}
        country={t(`phoneCodes.${item.country}`)}
        isActive={activeCode === item.code}
        onClick={() => this.handleSelect(item.code)}
      />
    )
  }

  render() {
    const { navigate, t, activeLanguage } = this.props
    const { activeCode } = this.state

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} />
        <Content>
          <FlatList
            data={phonesData}
            keyExtractor={item => item.code}
            extraData={[activeCode, activeLanguage]}
            renderItem={this.renderItem}
          />
          <Button text={t('sign.submit')} onClick={this.handleSubmit} linear />
        </Content>
      </Container>
    )
  }
}

PhoneNumbersModal.propTypes = {
  value: PropTypes.string,
  navigate: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
}

export default PhoneNumbersModal
