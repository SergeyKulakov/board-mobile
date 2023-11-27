import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import i18n from 'I18N'
import { isUSA } from 'Helpers/user'

import Picker from 'react-native-date-picker'
import {
  Modal,
  Button,
  InputBlock,
  CurrencySelect,
  PickerRootScreen,
} from 'Components/UI'
import { ButtonsGroup } from 'Components/Blocks'
import { View, TouchableWithoutFeedback } from 'react-native'

import config, { hours, minutes } from './config'
import styles, {
  Container,
  BackIcon,
  ButtonsWrapper,
  PickerWrapper,
  CustomPicker,
  PickerItemWrapper,
  PickerItemText,
  BudgetWrapper,
  InputContainer,
  CurrencySelectWrapper,
} from './style'

class SelectDateModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      activeScreen: config.screenIds.root,
      isRequest: false,
      minData: new Date(),
    }

    this.is12Hours = isUSA(props.user)
  }

  setActiveScreen = screenId => this.setState({ activeScreen: screenId })

  handleClickCancel = () => {
    const { onCancel } = this.props

    this.setState(
      {
        date: new Date(),
        activeScreen: config.screenIds.root,
        isRequest: false,
      },
      onCancel,
    )
  }

  handleChangeDate = date => this.setState({ date })

  handleChangeHours = hour => {
    const { date } = this.state

    this.setState({
      date: moment(date)
        .set('hour', hour)
        .format(),
      activeScreen: config.screenIds.root,
    })
  }

  handleChangeMinutes = minute => {
    const { date } = this.state

    this.setState({
      date: moment(date)
        .set('minute', minute)
        .format(),
      activeScreen: config.screenIds.root,
    })
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { date } = this.state

    this.setState({ isRequest: true })

    onSubmit(date, () => {
      this.setState({ isRequest: false })
    })
  }

  renderRoot = () => {
    const {
      t,
      budget,
      currencyCode,
      onChangeBudget,
      onClickCurrency,
      onCloseKeyboard,
      isKeyboardShow,
    } = this.props
    const { date, isRequest } = this.state

    return (
      <TouchableWithoutFeedback
        onPress={onCloseKeyboard}
        disabled={!isKeyboardShow}
      >
        <View>
          <PickerRootScreen
            testID="RootScreen"
            date={moment(date).format('DD-MMM-YYYY')}
            hour={moment(date).format(this.is12Hours ? 'hh' : 'HH')}
            minute={moment(date).format(`mm ${this.is12Hours ? 'A' : ''}`)}
            onClickDate={() => this.setActiveScreen(config.screenIds.date)}
            onClickHour={() => this.setActiveScreen(config.screenIds.hours)}
            onClickMinute={() => this.setActiveScreen(config.screenIds.minutes)}
          />

          <BudgetWrapper>
            <InputContainer>
              <InputBlock
                animatedLabel
                animatedLine
                numberMode
                onChange={onChangeBudget}
                value={String(budget)}
                label={t('jobPost.budget')}
              />
            </InputContainer>
            <CurrencySelectWrapper>
              <CurrencySelect value={currencyCode} onClick={onClickCurrency} />
            </CurrencySelectWrapper>
          </BudgetWrapper>
          <ButtonsGroup
            testID="ButtonGroup"
            onCancel={this.handleClickCancel}
            cancelText={t('jobPost.cancel')}
            isSubmitLoading={isRequest}
            onSubmit={this.handleSubmit}
            submitText={t('sign.submit')}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderPickerItem = ({ item }) => {
    const { date, activeScreen } = this.state
    return (
      <PickerItemWrapper
        onPress={
          activeScreen === config.screenIds.hours
            ? () => this.handleChangeHours(item)
            : () => this.handleChangeMinutes(item)
        }
      >
        <PickerItemText
          isActive={
            (activeScreen === config.screenIds.hours
              ? moment(date).hour()
              : moment(date).minutes()) === item
          }
        >
          {String(item)}
        </PickerItemText>
      </PickerItemWrapper>
    )
  }

  renderSwitchMinutesPicker = () => {
    const { date, activeScreen } = this.state

    if (this.is12Hours) {
      return (
        <Picker
          date={new Date(date)}
          onDateChange={this.handleChangeDate}
          mode="time"
          locale={i18n.locale}
        />
      )
    }

    return (
      <CustomPicker
        keyExtractor={item => String(item)}
        data={activeScreen === config.screenIds.hours ? hours : minutes}
        renderItem={this.renderPickerItem}
      />
    )
  }

  renderDatePicker = () => {
    const { t } = this.props
    const { activeScreen, date, minData } = this.state

    return (
      <PickerWrapper>
        {activeScreen === config.screenIds.date ? (
          <Picker
            date={new Date(date)}
            onDateChange={this.handleChangeDate}
            mode={activeScreen === config.screenIds.time ? 'time' : 'date'}
            minimumDate={minData}
            locale={i18n.locale}
          />
        ) : (
          this.renderSwitchMinutesPicker()
        )}
        {this.is12Hours || activeScreen === config.screenIds.date ? (
          <ButtonsWrapper isOneButton>
            <Button
              testID="selectButton"
              style={styles.submitButton}
              onClick={() => this.setActiveScreen(config.screenIds.root)}
            >
              {t('subscriptionScreen.select')}
            </Button>
          </ButtonsWrapper>
        ) : null}
      </PickerWrapper>
    )
  }

  renderSwitch = () => {
    const { activeScreen } = this.state

    if (activeScreen === config.screenIds.root) {
      return this.renderRoot()
    }

    return this.renderDatePicker()
  }

  render() {
    const { isVisible, t } = this.props
    const { activeScreen } = this.state

    return (
      <Modal
        visible={isVisible}
        title={t('serviceProvider.hireNow')}
        onCancelPress={this.handleClickCancel}
      >
        {activeScreen === config.screenIds.root ? null : (
          <BackIcon
            testID="BackIcon"
            onClick={() => this.setActiveScreen(config.screenIds.root)}
          />
        )}
        <Container>{this.renderSwitch()}</Container>
      </Modal>
    )
  }
}

SelectDateModal.propTypes = {
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currencyCode: PropTypes.string,
  isKeyboardShow: PropTypes.bool,
  isVisible: PropTypes.bool,
  t: PropTypes.func,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  onChangeBudget: PropTypes.func,
  onClickCurrency: PropTypes.func,
  onCloseKeyboard: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default SelectDateModal
