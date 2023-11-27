import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { filteredServices } from 'Helpers/services'

import { Button } from 'Components/UI'
import { ScreenLoader } from 'Components/Blocks'
import { Header, Services, SubServices } from './innerBlocks'

import { getText } from './config'

import { Container, styles } from './style'

class ServicesModal extends PureComponent {
  constructor(props) {
    super(props)

    const {
      changedSubServiceId,
      changedServiceId,
      userServices,
      categories,
      isEditMode,
      startStep,
    } = props

    const state = {
      step: startStep || (changedSubServiceId ? 2 : 1),
      text: getText(),
      filterValue: '',
      activeService: null,
      data: userServices || [],
      isChanged: false,
      loading: {
        categories: false,
        popular: false,
      },
    }

    this.disabledItems = []

    if (changedServiceId) {
      state.activeService = categories.find(el => el._id === changedServiceId)
    }

    if (isEditMode) {
      this.disabledItems = userServices.filter(
        el => el._id !== changedSubServiceId || el._id !== changedServiceId,
      )
    }

    this.state = state
  }

  componentDidMount() {
    const {
      popularServices,
      categories,
      onLoadPopularServices,
      onLoadServices,
      navigate,
    } = this.props

    if (!categories.length) {
      this.setState(prevState => ({
        loading: { ...prevState.loading, categories: true },
      }))
      onLoadServices({
        callback: ({ error }) => {
          if (error) {
            navigate.showMessage(error.payload.message)
          }
          this.setState(prevState => ({
            loading: { ...prevState.loading, categories: false },
          }))
        },
      })
    }
    if (!popularServices.length) {
      this.setState(prevState => ({
        loading: { ...prevState.loading, popular: true },
      }))
      onLoadPopularServices({
        callback: ({ error }) => {
          if (error) {
            navigate.showMessage(error.payload.message)
          }
          this.setState(prevState => ({
            loading: { ...prevState.loading, popular: false },
          }))
        },
      })
    }
  }

  _setStep = step => this.setState({ step })

  _renderContent = () => {
    const {
      categories,
      popularServices,
      isEditMode,
      changedServiceId,
      changedSubServiceId,
    } = this.props
    const { step, text, filterValue, activeService, data } = this.state

    const defaultProps = {
      text,
      onClickItem: this.handleItemClick,
      disabledItems: this.disabledItems,
    }

    if (step === 2) {
      return (
        <SubServices
          {...defaultProps}
          data={activeService.subservices}
          changedItemId={changedSubServiceId}
          activeItems={data}
          isEditMode={isEditMode}
        />
      )
    }

    return (
      <Services
        {...defaultProps}
        allData={filteredServices(categories, filterValue)}
        popularData={filteredServices(popularServices, filterValue)}
        filterValue={filterValue}
        isEditMode={isEditMode}
        changedItemId={changedServiceId}
        activeItems={data}
      />
    )
  }

  handleItemClick = item => {
    const { user, navigate, isOneServiceMode } = this.props
    const { step, data, activeService, text, isChanged } = this.state

    if (data.find(el => el._id === item._id)) {
      this.setState({
        data: isOneServiceMode ? [] : data.filter(el => el._id !== item._id),
        isChanged: true,
      })
      return
    }

    const isAppruve = () => {
      if (!user.isPremium && data.length === 3) {
        if (!isChanged) navigate.showMessage(text.deselectError)
        else navigate.showMessage(text.errorMessage)
        return false
      }
      return true
    }

    if (step === 1) {
      if (item.subservices.length) {
        this.setState({
          activeService: item,
          step: 2,
        })
      } else {
        if (!isAppruve()) return

        this.setState({
          activeService: item,
          data: isOneServiceMode ? [item] : data.concat([{ ...item }]),
          isChanged: true,
        })
      }
    } else {
      if (!isAppruve()) return

      this.setState({
        data: isOneServiceMode
          ? [{ ...item, categoryId: activeService._id }]
          : data.concat([{ ...item, categoryId: activeService._id }]),
        isChanged: true,
      })
    }
  }

  handleChangeFilterValue = value => this.setState({ filterValue: value })

  handleSaveClick = () => {
    const { setServices, navigate, categories } = this.props
    const { data } = this.state

    const result = data.map(el => {
      if (el.categoryId) {
        return {
          ...el,
          parentCategory: categories.find(item => item._id === el.categoryId),
        }
      }

      return el
    })

    setServices(result)
    navigate.hideModal()
  }

  render() {
    const { navigate } = this.props
    const { text, filterValue, step, loading, isChanged } = this.state

    const isLoading = loading.categories || (step === 1 && loading.popular)

    const onBackAction =
      step === 1 ? navigate.hideModal : () => this._setStep(1)

    const searchProps = {
      value: filterValue,
      placeholder: text.search,
      onChange: this.handleChangeFilterValue,
    }

    return (
      <Container>
        <Header
          title={text.title}
          step={step === 1 ? text.step : text.stepTwo}
          onGoBack={onBackAction}
          searchProps={step === 1 && searchProps}
        />
        {this._renderContent()}
        <Button
          visible={isChanged}
          linear
          text={text.addService}
          style={styles.button}
          onClick={this.handleSaveClick}
        />
        <ScreenLoader visible={isLoading} />
      </Container>
    )
  }
}

ServicesModal.propTypes = {
  navigate: PropTypes.object.isRequired, // from withNavigate hoc

  onLoadPopularServices: PropTypes.func.isRequired, // api call
  onLoadServices: PropTypes.func.isRequired, // api call
  popularServices: PropTypes.array, // from redux
  categories: PropTypes.array, // from redux
  user: PropTypes.object.isRequired, // from redux

  startStep: PropTypes.number, // from passProps
  isOneServiceMode: PropTypes.bool, // from passProps
  isEditMode: PropTypes.bool, // from passProps
  setServices: PropTypes.func.isRequired, // from passProps
  userServices: PropTypes.array, // from passProps
  changedSubServiceId: PropTypes.string, // from passProps
  changedServiceId: PropTypes.string, // from passProps
}

export default ServicesModal
