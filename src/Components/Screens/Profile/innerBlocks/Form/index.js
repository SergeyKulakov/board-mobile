import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Button } from 'Components/UI'

import { validation } from './config'
import {
  Certificates,
  GeneralInfo,
  Links,
  PickOfWork,
  PickUserId,
  Service,
  ProviderSwitch,
} from '../index'
import {
  Block,
  ButtonContainer,
  FormBlock,
  GeneralInfoContainer,
  styles,
} from './style'

class Form extends Component {
  state = {
    isButtonShow: false,
  }

  scrollContainer = React.createRef()

  scrollPosition = 0

  componentDidUpdate(prevProps) {
    const { user, values, setValues } = this.props

    const result = {}
    if (prevProps.user.avatarB64 !== user.avatarB64) {
      result.avatar = user.avatarB64
    }
    if (!_.isEqual(prevProps.user.idPics, user.idPics)) {
      result.idPics = (user.idPics || []).map((el, index) => ({
        id: index,
        image: el,
      }))
    }
    if (!_.isEqual(prevProps.user.picsOfWork, user.picsOfWork)) {
      result.picsOfWork = (user.picsOfWork || []).map((el, index) => ({
        id: index,
        image: el,
      }))
    }
    if (!_.isEqual(prevProps.user.certificates, user.certificates)) {
      result.certificates = (user.certificates || []).map((el, index) => ({
        id: index,
        image: el,
      }))
    }

    if (prevProps.user.email_verified !== user.email_verified) {
      result.emailVerified = user.email_verified === 'true'
    }

    if (prevProps.user.phone_number_verified !== user.phone_number_verified) {
      result.phoneNumberVerified = user.phone_number_verified === 'true'
    }

    if (!_.isEmpty(result)) {
      setValues({
        ...values,
        ...result,
      })
    }
  }

  toggleIsProvider = () => {
    const {
      values: { isProvider },
    } = this.props

    if (!isProvider) {
      setTimeout(() => {
        this.scrollContainer.current.scrollTo({
          y: this.scrollPosition + 400,
          animated: true,
        })
      }, 100)
    } else {
      setTimeout(() => {
        this.scrollContainer.current.scrollToEnd()
      }, 100)
    }

    this._setFieldValue('isProvider', !isProvider)
  }

  _handleSubmit = () => {
    const { values, onShowMessage, setFieldValue, handleSubmit } = this.props

    const isValid = validation(values)
    if (isValid.status) handleSubmit()
    else {
      if (isValid.type === 'areYouPro') setFieldValue('isPro', false)
      onShowMessage(isValid.message, 4000)
    }
  }

  handleOpenAddService = () => {
    const { onOpenServices, values } = this.props
    onOpenServices({
      userServices: values.services,
      setServices: services =>
        this._setFieldValue(
          'services',
          services.map(el =>
            _.isString(el.status) ? { ...el } : { ...el, status: 'active' },
          ),
        ),
    })
  }

  handleEditServices = passProps => {
    const { values, onOpenServices } = this.props

    onOpenServices({
      changedServiceId: passProps.categoryId,
      changedSubServiceId: passProps.serviceId,
      userServices: values.services,
      isEditMode: true,
      setServices: services => {
        this._setFieldValue(
          'services',
          services.map(el =>
            _.isString(el.status) ? { ...el } : { ...el, status: 'active' },
          ),
        )
      },
    })
  }

  _setFieldValue = (key, props) => {
    const { setFieldValue } = this.props
    const { isButtonShow } = this.state

    if (!isButtonShow && key !== 'isAgreedWithTerms')
      this.setState({ isButtonShow: true })

    setFieldValue(key, props)
  }

  _setScrollPosition = ({ nativeEvent }) => {
    this.scrollPosition = nativeEvent.contentOffset.y
  }

  render() {
    const {
      onOpenAddressModal,
      servicesLoading,
      isPremium,
      text,
      onShowMessage,
      userId,
      user,
      onOpenGoogleMap,
      onVerify,
      isRequest,
      isRequestVerifyEmail,
      isRequestVerifyPhone,
      onOpenPhoneModal,
      ...props
    } = this.props
    const { isButtonShow } = this.state
    const { isProvider } = props.values

    return (
      <>
        <FormBlock
          ref={this.scrollContainer}
          onScroll={this._setScrollPosition}
        >
          <GeneralInfoContainer>
            <GeneralInfo
              {...props}
              text={text}
              userId={userId}
              userEmail={user.email}
              userPhone={user.phone_number}
              toast={onShowMessage}
              onOpenAddressModal={onOpenAddressModal}
              setFieldValue={this._setFieldValue}
              onOpenGoogleMap={onOpenGoogleMap}
              onVerify={onVerify}
              isRequestVerifyEmail={isRequestVerifyEmail}
              isRequestVerifyPhone={isRequestVerifyPhone}
              onOpenPhoneModal={onOpenPhoneModal}
            />
          </GeneralInfoContainer>
          <Block>
            <ProviderSwitch
              value={props.values.isProvider}
              text={text.isProvider}
              onSwitchClick={this.toggleIsProvider}
            />
          </Block>
          {isProvider && (
            <>
              <Block>
                <Service
                  {...props}
                  text={text}
                  testID="service"
                  loadInfo={servicesLoading}
                  isPremium={isPremium}
                  toast={onShowMessage}
                  setFieldValue={this._setFieldValue}
                  onAddServices={this.handleOpenAddService}
                  onEditServices={this.handleEditServices}
                />
              </Block>
              <Block>
                <Certificates
                  {...props}
                  text={text.Certificates}
                  userId={userId}
                  toast={onShowMessage}
                  isPremium={user.isPremium}
                  setFieldValue={this._setFieldValue}
                />
              </Block>
              <Block>
                <PickOfWork
                  {...props}
                  text={text.PickOfWork}
                  userId={userId}
                  toast={onShowMessage}
                  isPremium={user.isPremium}
                  setFieldValue={this._setFieldValue}
                />
              </Block>
              <Block>
                <PickUserId
                  {...props}
                  text={text.PickUserId}
                  userId={userId}
                  toast={onShowMessage}
                  isPremium={user.isPremium}
                  setFieldValue={this._setFieldValue}
                />
              </Block>
              <Block>
                <Links
                  {...props}
                  text={text.Links}
                  toast={onShowMessage}
                  isPremium={user.isPremium}
                  setFieldValue={this._setFieldValue}
                />
              </Block>
            </>
          )}
        </FormBlock>
        {isButtonShow && (
          <ButtonContainer>
            <Button
              testID="submitButton"
              style={styles.button}
              linear
              loading={isRequest}
              disabled={!props.values.isAgreedWithTerms}
              text={text.buttonText}
              onClick={this._handleSubmit}
            />
          </ButtonContainer>
        )}
      </>
    )
  }
}

Form.propTypes = {
  user: PropTypes.object,
  servicesLoading: PropTypes.bool,
  userId: PropTypes.string,
  text: PropTypes.object,
  isPremium: PropTypes.bool,
  onOpenAddressModal: PropTypes.func,
  onOpenServices: PropTypes.func,
  onShowMessage: PropTypes.func,
  onOpenGoogleMap: PropTypes.func,
  onVerify: PropTypes.func,
  isRequest: PropTypes.bool,
  isRequestVerifyEmail: PropTypes.bool,
  isRequestVerifyPhone: PropTypes.bool,
  onOpenPhoneModal: PropTypes.func,
  values: PropTypes.object,
  setValues: PropTypes.func,
}

export { Form }
