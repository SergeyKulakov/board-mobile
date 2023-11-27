import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'

import { InputBlock, RoundCheckbox, Button } from 'Components/UI'
import { Header } from './innerBlocks'

import {
  Container,
  RowWrapper,
  RowText,
  ListHeader,
  Title,
  SubTitle,
  InputWrapper,
  ButtonWrapper,
  List,
} from './style'
import { reasonKeys } from './config'

class DeleteMyAccount extends PureComponent {
  constructor(props) {
    super(props)

    const { t } = props

    this.state = {
      isRequest: false,
      checkedValue: 2,
      reason: '',
    }

    this.getData = memoize(() =>
      reasonKeys.map((el, index) => ({
        text: t(`deleteAccountScreen.${el}`),
        value: index,
        onClick: () => this.handleChangeValue(index),
      })),
    )

    this.input = React.createRef()
    this.list = React.createRef()
  }

  handleChangeReason = reason => this.setState({ reason })

  handleChangeValue = value => {
    this.setState({ checkedValue: value, reason: '' }, () => {
      if (value === 6) this.input.current.handleSetFocus()
    })
  }

  handleSubmit = () => {
    const { onShowPuck, onDeleteAccount, getError, t } = this.props
    const { reason, checkedValue } = this.state
    if (checkedValue === 6 && !reason) {
      onShowPuck({
        type: 'warning',
        message: t('deleteAccountScreen.writeYourReason'),
      })
    } else {
      const request =
        checkedValue === 6
          ? reason
          : t(`deleteAccountScreen.${reasonKeys[checkedValue]}`)

      this.setState({ isRequest: true }, () => {
        onDeleteAccount(request, ({ error }) => {
          this.setState({ isRequest: false }, () => {
            if (error) {
              onShowPuck({
                type: 'error',
                message: getError(error),
              })
            }
          })
        })
      })
    }
  }

  handleScrollToBottom = () => this.list.current.scrollToEnd()

  renderRow = ({ item }) => {
    const { checkedValue, isRequest } = this.state

    return (
      <RowWrapper>
        <RoundCheckbox
          isActive={item.value === checkedValue}
          onClick={item.onClick}
          disabled={isRequest}
        />
        <RowText>{item.text}.</RowText>
      </RowWrapper>
    )
  }

  renderListHeader = () => {
    const { t } = this.props

    return (
      <ListHeader>
        <Title>{t('deleteAccountScreen.deleteYourAccount')}</Title>
        <SubTitle>{t('deleteAccountScreen.whyYouAreLeaving')}.</SubTitle>
      </ListHeader>
    )
  }

  renderListFooter = () => {
    const { t } = this.props
    const { reason, isRequest, checkedValue } = this.state

    return (
      <InputWrapper>
        <InputBlock
          ref={this.input}
          value={reason}
          disabled={isRequest || checkedValue !== 6}
          onChange={this.handleChangeReason}
          onFocus={this.handleScrollToBottom}
          animatedLine
          label={t('deleteAccountScreen.writeYourReason')}
          placeholder={t('deleteAccountScreen.typeHere')}
        />
      </InputWrapper>
    )
  }

  render() {
    const { navigate, activeLanguage, t } = this.props
    const { reason, isRequest, checkedValue } = this.state

    const data = this.getData(activeLanguage)

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} />
        <List
          ref={this.list}
          data={data}
          extraData={[reason, isRequest, checkedValue]}
          keyExtractor={item => item.text}
          ListHeaderComponent={this.renderListHeader}
          ListFooterComponent={this.renderListFooter}
          renderItem={this.renderRow}
        />
        <ButtonWrapper>
          <Button
            testID="submitButton"
            linear
            loading={isRequest}
            onClick={this.handleSubmit}
          >
            {t('deleteAccountScreen.deleteMyAccount').toUpperCase()}
          </Button>
        </ButtonWrapper>
      </Container>
    )
  }
}

DeleteMyAccount.propTypes = {
  activeLanguage: PropTypes.string,
  getError: PropTypes.func,
  navigate: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  onDeleteAccount: PropTypes.func,
  onShowPuck: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default DeleteMyAccount
