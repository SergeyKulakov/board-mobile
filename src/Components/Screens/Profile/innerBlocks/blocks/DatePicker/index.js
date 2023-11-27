import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import i18n from 'I18N'

import { TouchableOpacity } from 'react-native'
import Picker from 'react-native-date-picker'
import { Modal } from 'Components/UI'

import { Text, Label, Content, SubInfo, PickerWrapper } from './style'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)

    const { value } = props

    this.state = {
      isShowModal: false,
      date: value || new Date(),
      maxData: new Date(),
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value !== value) this.setState({ date: value })
  }

  handleOpenModal = () => this.setState({ isShowModal: true })

  handleCloseModal = () => this.setState({ isShowModal: false })

  handleChangeDate = date => this.setState({ date })

  handleSubmit = () => {
    const { onSelect } = this.props
    const { date } = this.state

    this.handleCloseModal()
    onSelect(date)
  }

  render() {
    const { text, value } = this.props
    const { isShowModal, date, maxData } = this.state

    return (
      <>
        <TouchableOpacity onPress={this.handleOpenModal}>
          <Label isActive={value}>{text.label}</Label>
          <Content>
            <Text isActive={value}>
              {value && moment(value).isValid()
                ? moment(value).format('DD MMM YYYY')
                : text.label}
            </Text>
          </Content>
          <SubInfo>{text.SubInfoText}</SubInfo>
        </TouchableOpacity>

        <Modal
          testID="modal"
          visible={isShowModal}
          onCancelPress={this.handleCloseModal}
          onConfirmPress={this.handleSubmit}
        >
          <PickerWrapper>
            <Picker
              mode="date"
              locale={i18n.locale}
              maximumDate={maxData}
              date={new Date(date)}
              onDateChange={this.handleChangeDate}
            />
          </PickerWrapper>
        </Modal>
      </>
    )
  }
}

DatePicker.propTypes = {
  text: PropTypes.object,
  value: PropTypes.string,
  onSelect: PropTypes.func,
}

export { DatePicker }
