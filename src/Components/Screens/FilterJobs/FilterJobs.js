import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as routes from 'Constants/routes'
import _ from 'lodash'
import { filteredServices } from 'Helpers/services'

import { Formik } from 'formik'
import { ScreenLoader } from 'Components/Blocks'
import { Button } from 'Components/UI'
import { Header, Location, Services } from './innerBlocks'
import { getText, getInitialValues } from './config'
import { Container, Content } from './style'

class FilterJobs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      text: getText(),
      loading: {
        all: false,
        popular: false,
      },
    }

    let servicesLength = 0
    props.categories.forEach(item => {
      if (_.isEmpty(item.subservices)) servicesLength++
      else item.subservices.forEach(() => servicesLength++)
    })

    this.servicesLength = servicesLength
  }

  componentDidMount() {
    const {
      categories,
      onLoadServices,
      popularServices,
      onLoadPopularServices,
      getError,
      onShowPuck,
    } = this.props

    if (!categories.length) {
      this.setState(prevState => ({
        loading: { ...prevState.loading, categories: true },
      }))
      onLoadServices({
        callback: ({ error }) => {
          this.setState(prevState => ({
            loading: { ...prevState.loading, categories: false },
          }))
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          }
        },
      })
    }
    if (!popularServices.length) {
      this.setState(prevState => ({
        loading: { ...prevState.loading, popular: true },
      }))
      onLoadPopularServices({
        callback: ({ error }) => {
          this.setState(prevState => ({
            loading: { ...prevState.loading, popular: false },
          }))
          if (error) {
            onShowPuck({
              type: error,
              message: getError(error),
            })
          }
        },
      })
    }
  }

  handleSubmit = ({
    address,
    city,
    country,
    lat,
    lon,
    state,
    zipCode,
    services,
    radius,
  }) => {
    const { user, navigate, onSubmit } = this.props

    const result = {}

    if (lat && lon) {
      result.address = address
      result.city = city
      result.country = country
      result.state = state
      result.zipCode = zipCode
      result.radius = user.defaultRadius || 10
      result.lat = lat
      result.lon = lon
      result.radius = radius
    }

    if (!_.isEmpty(services)) result.services = services

    navigate.pop()
    onSubmit(result)
  }

  handleResetForm = () => {
    this.form.setValues(getInitialValues())
  }

  renderContent = ({ values, setFieldValue, setValues, handleSubmit }) => {
    const { categories, popularServices, navigate } = this.props
    const { text } = this.state

    const _setLocation = value => {
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
        navigate.showMessage(text.Location.errorAddressLocated)
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

    const _setFieldValue = (key, value) => {
      if (values.lat || values.lon) {
        if (
          key === 'city' ||
          key === 'state' ||
          key === 'zipCode' ||
          key === 'country'
        ) {
          setValues({
            ...values,
            lat: '',
            lon: '',
          })
        }
      }

      setFieldValue(key, value)
    }

    const _handleItemClick = item => {
      if (values.services.find(el => el._id === item._id)) {
        setValues({
          ...values,
          selectedAll: false,
          services: values.services.filter(el => el._id !== item._id),
        })
        return
      }

      const _setServices = (key, value) => {
        setValues({
          ...values,
          [key]: value,
          selectedAll: value.length === this.servicesLength,
        })
      }

      if (!item.subservices.length) {
        _setServices('services', values.services.concat([item]))
      } else {
        const activeItems = values.services.filter(
          el => el.categoryId === item._id,
        )

        navigate.showModal(routes.filterSubServices, {
          categoryId: item._id,
          activeItems,
          onSubmit: services => {
            _setServices(
              'services',
              values.services
                .filter(el => el.categoryId !== item._id)
                .concat(services.map(el => ({ ...el, categoryId: item._id }))),
            )
          },
        })
      }
    }

    const _handleSelectAll = () => {
      if (values.selectedAll) {
        setValues({
          ...values,
          services: [],
          selectedAll: false,
        })
        return
      }

      const result = []
      filteredServices(categories, values.search).forEach(item => {
        if (_.isEmpty(item.subservices)) result.push(item)
        else
          item.subservices.forEach(el =>
            result.push({ ...el, categoryId: item._id }),
          )
      })

      setValues({
        ...values,
        services: result,
        selectedAll: true,
      })
    }

    const _handleOpenMapModal = () => {
      navigate.showModal(routes.googleMapModal, {
        onSubmit: _setLocation,
        lat: values.lat,
        lon: values.lon,
      })
    }

    return (
      <>
        <Content>
          <Location
            text={text.Location}
            address={values.address}
            city={values.city}
            state={values.state}
            zipCode={values.zipCode}
            country={values.country}
            lat={values.lat}
            lon={values.lon}
            onChangeCity={value => _setFieldValue('city', value)}
            onChangeState={value => _setFieldValue('state', value)}
            onChangeZipCode={value => _setFieldValue('zipCode', value)}
            onChangeCountry={value => _setFieldValue('country', value)}
            onOpenLocationModal={() =>
              navigate.showModal(routes.locationModal, { onSave: _setLocation })
            }
            onMapClick={_handleOpenMapModal}
          />
          <Services
            popularData={filteredServices(popularServices, values.search)}
            data={filteredServices(categories, values.search)}
            activeItems={values.services}
            text={text.Services}
            onItemClick={_handleItemClick}
            onSelectAll={_handleSelectAll}
            isSelectedAll={values.selectedAll}
            filterProps={{
              value: values.search,
              label: text.Services.label,
              placeholder: text.Services.placeholder,
              animatedLine: true,
              onChange: value => setFieldValue('search', value),
            }}
          />
        </Content>
        <Button text={text.submitButton} onClick={handleSubmit} linear />
      </>
    )
  }

  render() {
    const { navigate, filters } = this.props
    const { text, loading } = this.state

    let initialValue
    if (!_.isEmpty(filters)) {
      initialValue = getInitialValues(
        filters,
        _.isEmpty(filters.services)
          ? false
          : this.servicesLength === filters.services.length,
      )
    } else {
      initialValue = getInitialValues()
    }

    return (
      <Container>
        <Header
          text={text.Header}
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
          onClearClick={this.handleResetForm}
        />
        <Formik
          ref={ref => (this.form = ref)}
          initialValues={initialValue}
          onSubmit={this.handleSubmit}
          render={this.renderContent}
        />
        <ScreenLoader
          testID="screenLoader"
          visible={loading.all || loading.popular}
        />
      </Container>
    )
  }
}

FilterJobs.propTypes = {
  user: PropTypes.object.isRequired,
  navigate: PropTypes.object.isRequired,
  onLoadServices: PropTypes.func.isRequired,
  onLoadPopularServices: PropTypes.func.isRequired,
  categories: PropTypes.array,
  popularServices: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  filters: PropTypes.object,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
}

export default FilterJobs
