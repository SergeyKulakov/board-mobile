import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import limits from 'Constants/uploadLimits'
import { getJobImage } from 'Helpers/getImageUri'
import { isBase64 } from 'Helpers/isBase64'

import { ScreenLoader } from 'Components/Blocks'
import { SectionList, Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { ShadowBox, Button } from 'Components/UI'

import {
  Header,
  CategoryBlock,
  LocationBlock,
  InfoBlock,
  DatesBlock,
  Picks,
  VideoLinks,
} from './innerBlocks'

import config, {
  getText,
  initialValues,
  locationKeys,
  infoKeys,
  dateKeys,
} from './config'
import { Container, Content, Block, ButtonContainer, styles } from './style'

class PostJob extends PureComponent {
  constructor(props) {
    super(props)
    const { job, isEditMode } = props

    this.state = {
      text: getText(),
      buttonsWrapperHeight: 100,
    }

    this._scrollContainer = React.createRef()
    this.isEditMode = isEditMode && _.isObject(job) && !_.isEmpty(job)
    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    const { t, user, onShowPuck, navigate } = this.props
    this.setState({ text: getText() })

    if (
      user.email_verified !== 'true' ||
      user.phone_number_verified !== 'true'
    ) {
      onShowPuck({
        type: 'error',
        message: t('apiErrors.profileNotComplete'),
        text: {
          submit: t('common.openProfileWarn'),
        },
        onSubmit: () => {
          navigate.push(routes.profile)
        },
        callback: navigate.pop,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { submitCount, errors, values, touched, onShowPuck, t } = this.props

    if (prevProps.submitCount !== submitCount && !prevState.loading) {
      if (_.isEqual(values, initialValues) || errors.category) {
        this.scrollTo(config.sections.category)
        onShowPuck({
          type: 'warning',
          message: t('jobPost.JobPostCategoryMissing'),
        })
      } else if ((touched.lat && errors.lat) || (touched.lon && errors.lon)) {
        this.scrollTo(config.sections.location)
      } else if (touched.title && errors.title) {
        this.scrollTo(config.sections.info)
      } else if (
        (touched.doneBefore && errors.doneBefore) ||
        (touched.expiryDate && errors.expiryDate)
      ) {
        this.scrollTo(config.sections.dates)
      }
    }
  }

  scrollTo = index => {
    this._scrollContainer.current.scrollToLocation({
      itemIndex: Platform.OS === 'ios' ? index : index + 1,
      animated: true,
    })
  }

  setLocation = value => {
    const { setValues, values, navigate } = this.props
    const { text } = this.state

    if (_.isObject(value)) {
      setValues({
        ...values,
        address: value.address,
        city: value.city,
        state: value.stateLong,
        zipCode: value.zipCode,
        country: value.countryLong,
        lat: value.lat,
        lon: value.lon,
      })
    } else {
      navigate.showMessage(text.validation.errorAddressLocated)
      setValues({
        ...values,
        address: value,
        city: '',
        state: '',
        zipCode: '',
        country: '',
        lat: '',
        lon: '',
      })
    }
  }

  handleSetButtonsWrapperHeight = node => {
    const { height } = node.nativeEvent.layout

    this.setState({ buttonsWrapperHeight: height })
  }

  handleOpenServicesModal = () => {
    const { navigate, values, setFieldValue } = this.props

    const passProps = {
      isOneServiceMode: true,
      setServices: value => setFieldValue('category', value[0]),
      startStep: 1,
    }

    if (values.category) passProps.userServices = [values.category]

    navigate.showModal(routes.servicesModal, passProps)
  }

  handleOpenAddressModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.locationModal, { onSave: this.setLocation })
  }

  handleOpenMap = () => {
    const { navigate, values } = this.props

    navigate.showModal(routes.googleMapModal, {
      onSubmit: this.setLocation,
      lat: values.lat,
      lon: values.lon,
    })
  }

  handleChangeLocation = (key, value) => {
    const { setFieldValue, values, setValues } = this.props

    if ((values.lat || values.lon) && key !== 'zipCode') {
      setValues({
        ...values,
        lat: '',
        lon: '',
      })
    }

    setFieldValue(key, value)
  }

  handleSaveImage = image => {
    const { values, setFieldValue, user, t, onShowPuck } = this.props

    if (
      values.pics.length ===
      limits.picOfWork[user.isPremium ? 'premium' : 'free']
    ) {
      onShowPuck({
        type: 'error',
        message: t('jobPost.overflowError'),
      })
    } else {
      setFieldValue(
        'pics',
        [
          ...values.pics,
          {
            id: values.pics.length,
            image: `data:image/jpeg;base64,${image}`,
          },
        ].reverse(),
      )
    }
  }

  handleSaveVideoLink = ({ link, images, title = '', description = '' }) => {
    const { values, setFieldValue, user, navigate, t } = this.props

    if (
      values.videoLinks.length >=
      limits.VIDEO_LINKS_MAX_COUNT[user.isPremium ? 'premium' : 'free']
    ) {
      navigate.showMessage(t('jobPost.overflowError'))
      return
    }
    setFieldValue('videoLinks', [
      ...values.videoLinks,
      {
        id: values.videoLinks.length,
        link,
        image: images[0],
        info: title || description,
      },
    ])
  }

  handleDeleteVideoLink = id => {
    const { values, setFieldValue } = this.props

    setFieldValue('videoLinks', values.videoLinks.filter(el => el.id !== id))
  }

  handleDeleteImage = id => {
    const { values, setFieldValue } = this.props

    setFieldValue('pics', values.pics.filter(el => el.id !== id))
  }

  handleOpenCurrencyModal = () => {
    const {
      values: { currencyCode },
      navigate,
      setFieldValue,
    } = this.props

    navigate.showModal(routes.currencyModal, {
      activeCode: currencyCode,
      onSubmit: ({ code }) => setFieldValue('currencyCode', code),
    })
  }

  handleSetBeforeDate = date => {
    const { setFieldValue } = this.props

    setFieldValue('doneBefore', date)
  }

  handleSetExpiryDate = date => {
    const { setFieldValue } = this.props

    setFieldValue('expiryDate', date)
  }

  renderLocations = () => {
    const { values, handleBlur, errors, touched } = this.props
    const { text } = this.state

    return (
      <Block>
        <ShadowBox>
          <LocationBlock
            onBlur={handleBlur}
            values={_.pick(values, locationKeys)}
            text={text.Location}
            geocode={{
              lat: values.lat,
              lon: values.lon,
            }}
            isError={(errors.lat && touched.lat) || (errors.lon && touched.lon)}
            onChange={this.handleChangeLocation}
            onClickStreetAddress={this.handleOpenAddressModal}
            onMapClick={this.handleOpenMap}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderServices = () => {
    const { values, errors, touched } = this.props
    const { text } = this.state

    const service = values.category
      ? text.getServiceTitle(values.category.title)
      : null

    const parentCategory = _.has(values, 'category.parentCategory')
      ? text.getServiceTitle(values.category.parentCategory.title)
      : ''

    return (
      <Block>
        <ShadowBox style={styles.FirstShadowBox}>
          <CategoryBlock
            title={text.serviceTitle}
            isError={errors.category && touched.category}
            subTitle={
              parentCategory ? `${parentCategory} - ${service}` : service
            }
            onClick={this.handleOpenServicesModal}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderInfo = () => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldTouched,
    } = this.props
    const { text } = this.state

    return (
      <Block>
        <ShadowBox>
          <InfoBlock
            onChange={handleChange}
            onBlur={handleBlur}
            text={text.Details}
            values={_.pick(values, infoKeys)}
            errors={_.pick(errors, infoKeys)}
            touched={_.pick(touched, infoKeys)}
            setFieldTouched={setFieldTouched}
            onClickCurrency={this.handleOpenCurrencyModal}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderDates = () => {
    const { values, setFieldValue, errors, touched } = this.props
    const { text } = this.state

    return (
      <Block>
        <ShadowBox>
          <DatesBlock
            text={text.Dates}
            values={_.pick(values, dateKeys)}
            touched={_.pick(touched, dateKeys)}
            errors={_.pick(errors, dateKeys)}
            onSetBeforeDate={this.handleSetBeforeDate}
            onSetExpiryDate={this.handleSetExpiryDate}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderPics = () => {
    const { navigate, values, job } = this.props
    const { text } = this.state

    const getImages = image => {
      if (isBase64(image)) return image
      return getJobImage(job._id, image)
    }

    const _openShowImageView = index => {
      navigate.showModal(routes.imagesSlider, {
        data: values.pics.map(el => getImages(el.image)),
        activeIndex: index,
      })
    }

    const picsData = values.pics.map(el => ({
      ...el,
      image: getImages(el.image),
    }))

    return (
      <Block>
        <ShadowBox>
          <Picks
            title={text.pics}
            toast={navigate.showMessage}
            onClickImage={_openShowImageView}
            data={picsData}
            onAddImage={this.handleSaveImage}
            onDeleteImage={this.handleDeleteImage}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderVideoLinks = () => {
    const { values, navigate } = this.props
    const { text } = this.state

    return (
      <Block>
        <ShadowBox>
          <VideoLinks
            title={text.videoLinks}
            data={values.videoLinks}
            onAdd={this.handleSaveVideoLink}
            onDelete={this.handleDeleteVideoLink}
            toast={navigate.showMessage}
          />
        </ShadowBox>
      </Block>
    )
  }

  renderButtons = () => {
    const {
      navigate,
      handleSubmit,
      values: { isRequest },
    } = this.props
    const { text, buttonsWrapperHeight } = this.state

    return (
      <ButtonContainer height={buttonsWrapperHeight}>
        <Button {...styles.CancelButton} onClick={navigate.pop}>
          {text.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isRequest}
          onLayout={this.handleSetButtonsWrapperHeight}
          {...styles.SaveButton}
        >
          {this.isEditMode ? text.updateJob.toUpperCase() : text.postJobs}
        </Button>
      </ButtonContainer>
    )
  }

  render() {
    const {
      navigate,
      values: { isRequest },
    } = this.props
    const { text } = this.state

    return (
      <Container>
        <Header
          title={this.isEditMode ? text.updateJob : text.title}
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
        />
        <Content>
          <SectionList
            ref={this._scrollContainer}
            keyExtractor={item => item.key}
            sections={[
              {
                key: 'category',
                data: [' '],
                renderItem: this.renderServices,
              },
              {
                key: 'location',
                data: [' '],
                renderItem: this.renderLocations,
              },
              {
                key: 'info',
                data: [' '],
                renderItem: this.renderInfo,
              },
              {
                key: 'dates',
                data: [' '],
                renderItem: this.renderDates,
              },
              {
                key: 'pics',
                data: [' '],
                renderItem: this.renderPics,
              },
              {
                key: 'videoLinks',
                data: [' '],
                renderItem: this.renderVideoLinks,
              },
              {
                key: 'buttons',
                data: [' '],
                renderItem: this.renderButtons,
              },
            ]}
          />
        </Content>
        <ScreenLoader visible={isRequest} />
      </Container>
    )
  }
}

PostJob.propTypes = {
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  job: PropTypes.object,
  navigate: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  submitCount: PropTypes.number.isRequired,
  touched: PropTypes.object.isRequired,
  user: PropTypes.object,
  values: PropTypes.object.isRequired,
  onCreateJob: PropTypes.func,
  onUpdateJob: PropTypes.func,
  onShowPuck: PropTypes.func,
  isShowPack: PropTypes.bool,
  t: PropTypes.func,
}

export default PostJob
