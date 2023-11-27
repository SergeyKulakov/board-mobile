import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import _ from 'lodash'
import * as routes from 'Constants/routes'

import { Formik } from 'formik'

import ProfileImagesManager from 'Services/Images/ProfileImagesManager'
import { Navigation } from 'react-native-navigation'
import { ScreenLoader, LanguageModal } from 'Components/Blocks'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'

import { Form, Header } from './innerBlocks'
import { getInitialValue, getResultObject, getText } from './config'
import { Container, Content } from './style'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLanguageModalOpen: false,
      activeLanguage: i18n.locale,
      isRequest: false,
      isRequestVerifyEmail: false,
      isRequestVerifyPhone: false,
      text: getText(),
    }

    Navigation.events().bindComponent(this)
  }

  componentDidMount() {
    const {
      user,
      services,
      onLoadServices,
      navigate,
      getError,
      onLoadUser,
    } = this.props

    if (!_.has(user, 'username')) onLoadUser()

    if (!services.length) {
      onLoadServices(({ error }) => {
        if (error) navigate.showMessage(getError(error))
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { user, services } = this.props
    if (prevProps.user !== user) {
      this.form.setValues(getInitialValue(user, services))
    }
  }

  _setText = () => this.setState({ text: getText() })

  handleCloseLanguagesModal = () =>
    this.setState({ isLanguageModalOpen: false })

  handleOpenLanguagesModal = () => this.setState({ isLanguageModalOpen: true })

  handleChangeLanguage = language => this.setState({ activeLanguage: language })

  handleSetLanguage = () => {
    const { onSetLanguage } = this.props
    const { activeLanguage } = this.state

    onSetLanguage(activeLanguage)
    this._setText()
    this.handleCloseLanguagesModal()
  }

  handleSubmit = async values => {
    const {
      user,
      onUpdateUserData,
      navigate,
      onShowPuck,
      getError,
    } = this.props

    const result = getResultObject(user, values)

    if (_.isEmpty(result)) return

    try {
      const updatedData = {}

      this.setState({ isRequest: true })

      if (result.certificates) {
        updatedData.certificates = await ProfileImagesManager.updateProfileImages(
          profileImageTypes.certificates,
          result.certificates,
          user.username,
        )
        delete result.certificates
      }

      if (result.avatarB64) {
        const { filename } = await ProfileImagesManager.putProfileImage(
          {
            imageType: profileImageTypes.avatar,
            image: result.avatarB64,
          },
          { imageName: user.username },
        )

        updatedData.avatarB64 = filename

        delete result.avatarB64
      }

      if (result.idPics) {
        updatedData.idPics = await ProfileImagesManager.updateProfileImages(
          profileImageTypes.idPics,
          result.idPics,
          user.username,
        )
        delete result.idPics
      }

      if (result.picsOfWork) {
        updatedData.picsOfWork = await ProfileImagesManager.updateProfileImages(
          profileImageTypes.picsOfWork,
          result.picsOfWork,
          user.username,
        )
        delete result.picsOfWork
      }

      if (Object.keys(result).length) {
        onUpdateUserData({
          data: { ...result, ...updatedData },
          callback: ({ error }) => {
            if (error) {
              this.setState({ isRequest: false }, () => {
                onShowPuck({
                  type: 'error',
                  message: getError(error),
                })
              })
              return
            }

            this.setState({ isRequest: false }, () => {
              if (result.phoneNumber && false) {
                // todo remove it when will be connected verification
                navigate.showModal(routes.verificationsPhoneOrEmail, {
                  attributeName: 'phone_number',
                  userName: result.phoneNumber,
                  onSuccess: this._exitPage,
                })
              } else if (result.email) {
                navigate.showModal(routes.verificationsPhoneOrEmail, {
                  attributeName: 'email',
                  userName: result.email,
                  onSuccess: this._exitPage,
                })
              } else this._exitPage()
            })
          },
        })
      }
    } catch (err) {
      this.setState({ isRequest: false })
    }
  }

  handleOpenAddressModal = passProps => {
    const { navigate } = this.props

    navigate.showModal(routes.locationModal, passProps)
  }

  handleOpenPhoneModal = () => {
    const { navigate } = this.props
    navigate.showModal(routes.phonesModal, {
      value: this.form.state.values.phoneNumber,
      onSubmit: phone => {
        this.form.setFieldValue('phoneNumber', phone)
      },
    })
  }

  handleOpenServices = passProps => {
    const { navigate } = this.props

    navigate.showModal(routes.servicesModal, passProps)
  }

  handleOpenGoogleMap = passProps => {
    const { navigate } = this.props

    navigate.showModal(routes.googleMapModal, passProps)
  }

  handleOpenVerifyModal = (type, value) => {
    const { navigate, onResendVerifyCode, getError } = this.props

    if (type === 'email') this.setState({ isRequestVerifyEmail: true })
    else this.setState({ isRequestVerifyPhone: true })

    onResendVerifyCode(type, ({ error }) => {
      if (error) {
        navigate.showMessage(getError(error))
        this.setState({
          isRequestVerifyEmail: false,
          isRequestVerifyPhone: false,
        })
        return
      }

      this.setState(
        {
          isRequestVerifyEmail: false,
          isRequestVerifyPhone: false,
        },
        () =>
          navigate.showModal(routes.verificationsPhoneOrEmail, {
            attributeName: type,
            userName: value,
            onSuccess: this._exitPage,
          }),
      )
    })
  }

  _exitPage = () => {
    const { navigate, onShowPuck } = this.props

    onShowPuck({
      callback: navigate.pop,
    })
  }

  _renderContent = () => {
    const { navigate, user, services, servicesLoadInfo } = this.props
    const {
      isRequest,
      text,
      isRequestVerifyEmail,
      isRequestVerifyPhone,
    } = this.state

    return (
      <>
        <Formik
          initialValues={getInitialValue(user, services)}
          onSubmit={this.handleSubmit}
          ref={ref => (this.form = ref)}
          render={props => (
            <Form
              {...props}
              text={text}
              user={user}
              userId={user.username}
              services={services}
              isPremium={user.isPremium}
              isRequest={isRequest}
              isRequestVerifyEmail={isRequestVerifyEmail}
              isRequestVerifyPhone={isRequestVerifyPhone}
              onOpenServices={this.handleOpenServices}
              onOpenAddressModal={this.handleOpenAddressModal}
              onOpenGoogleMap={this.handleOpenGoogleMap}
              servicesLoadInfo={servicesLoadInfo}
              onShowMessage={navigate.showMessage}
              onVerify={this.handleOpenVerifyModal}
              onOpenPhoneModal={this.handleOpenPhoneModal}
              setValues={props.setValues}
            />
          )}
        />
      </>
    )
  }

  componentDidAppear() {
    this._setText()
    this.setState(prevState =>
      prevState.isRequest ? { isRequest: false } : null,
    )
  }

  render() {
    const { navigate, isRequest } = this.props
    const { isLanguageModalOpen, activeLanguage } = this.state

    return (
      <Container>
        <Header
          onGoBack={navigate.pop}
          onClickLanguageButton={this.handleOpenLanguagesModal}
        />
        <Content>
          {isRequest ? <ScreenLoader /> : this._renderContent()}
        </Content>

        <LanguageModal
          activeLanguage={activeLanguage}
          visible={isLanguageModalOpen}
          onCloseModal={this.handleCloseLanguagesModal}
          onChangeLanguage={this.handleChangeLanguage}
          onSetLanguage={this.handleSetLanguage}
        />
      </Container>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  isRequest: PropTypes.bool,
  services: PropTypes.array,
  servicesLoadInfo: PropTypes.object,
  navigate: PropTypes.object.isRequired,
  onLoadServices: PropTypes.func.isRequired,
  onUpdateUserData: PropTypes.func.isRequired,
  onSetLanguage: PropTypes.func,
  onResendVerifyCode: PropTypes.func.isRequired,
  onShowPuck: PropTypes.func,
  isShowPack: PropTypes.bool,
  t: PropTypes.func,
  getError: PropTypes.func,
  onLoadUser: PropTypes.func,
}

export default Profile
