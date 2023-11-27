import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, FlatList } from 'react-native'

import { Button, ShadowBox, InputBlock } from 'Components/UI'

import { ServiceItem } from '../blocks'
import {
  ListContainer,
  ButtonContainer,
  InputContainer,
  addServicesBtnStyle,
} from './style'

class Service extends Component {
  state = {
    openDialogId: null,
  }

  handleOpenDialog = id => this.setState({ openDialogId: id })

  handleCloseDialog = () => this.setState({ openDialogId: null })

  handleEdit = item => {
    const { onEditServices } = this.props
    if (!item) return

    if (item.categoryId) {
      onEditServices({
        serviceId: item._id,
        categoryId: item.categoryId,
        step: 2,
      })
    } else {
      onEditServices({
        categoryId: item._id,
        step: 1,
      })
    }

    this.handleCloseDialog()
  }

  handleDelete = id => {
    const { setFieldValue, values } = this.props
    const services = values.services.filter(el => el._id !== id)

    setFieldValue('services', services)

    this.handleCloseDialog()
  }

  handleToggleActive = id => {
    const { values, setFieldValue } = this.props

    const services = values.services.map(el =>
      el._id === id
        ? { ...el, status: el.status === 'active' ? 'inactive' : 'active' }
        : { ...el },
    )

    setFieldValue('services', services)
  }

  handleAddService = () => {
    const { onAddServices, isPremium, values, toast, text } = this.props

    if (values.services.length >= 3 && !isPremium) {
      toast(text.servicesLengthError)
      return
    }

    onAddServices()
  }

  renderService = ({ item }) => {
    const { services, text } = this.props
    const { openDialogId } = this.state

    const categoryTitle = item.categoryId
      ? services.find(el => el._id === item.categoryId).title
      : null

    return (
      <ServiceItem
        categoryTitle={categoryTitle}
        text={text.serviceItem}
        isOpenDialog={openDialogId === item._id}
        key={item._id}
        title={item.title}
        status={item.status}
        onEdit={() => this.handleEdit(item)}
        onDelete={() => this.handleDelete(item._id)}
        onOpenDialog={() => this.handleOpenDialog(item._id)}
        onCloseDialog={() => this.handleCloseDialog(item._id)}
        onChangeStatus={() => this.handleToggleActive(item._id)}
      />
    )
  }

  render() {
    const { values, setFieldValue, handleBlur, text } = this.props
    const { openDialogId } = this.state

    return (
      <TouchableWithoutFeedback onPress={this.handleCloseDialog}>
        <ShadowBox>
          <ShadowBox.Title>{text.serviceScreenTitle}</ShadowBox.Title>
          <ListContainer>
            <FlatList
              keyExtractor={item => String(item._id)}
              data={values.services}
              extraData={[openDialogId, text]}
              renderItem={this.renderService}
            />
          </ListContainer>
          <ButtonContainer>
            <Button
              style={addServicesBtnStyle}
              text={text.addServiceBtn}
              onClick={this.handleAddService}
            />
          </ButtonContainer>
          <InputContainer>
            <InputBlock
              testID="aboutInput"
              label={text.aboutLabel}
              multiline
              autoHeight
              numberOfLines={1}
              animatedLabel
              animatedLine
              value={values.about}
              onBlur={handleBlur('about')}
              onChange={value => setFieldValue('about', value)}
            />
          </InputContainer>
        </ShadowBox>
      </TouchableWithoutFeedback>
    )
  }
}

Service.propTypes = {
  text: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  isPremium: PropTypes.bool,
  onAddServices: PropTypes.func,
  onEditServices: PropTypes.func,
  handleBlur: PropTypes.func,
  toast: PropTypes.func,
  services: PropTypes.array,
}

export { Service }
