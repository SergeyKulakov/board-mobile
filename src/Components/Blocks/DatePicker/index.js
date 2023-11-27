import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Picker from 'react-native-date-picker'
import { Modal } from 'Components/UI'
import { Container, styles } from './style'

class DatePicker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      date: props.date || new Date(),
    }
  }

  componentDidUpdate(prevProps) {
    const { date } = this.props
    if (prevProps.date !== date) this.setState({ date })
  }

  handleChange = date => {
    const { onChange } = this.props
    this.setState({ date })

    if (_.isFunction(onChange)) onChange(date)
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { date } = this.state

    onSubmit(date)
  }

  render() {
    const {
      mode,
      maximumDate,
      minimumDate,
      visible,
      onCancel,
      locale,
    } = this.props
    const { date } = this.state

    return (
      <Modal
        visible={visible}
        {...styles.Modal}
        onCancelPress={onCancel}
        onConfirmPress={this.handleSubmit}
      >
        <Container>
          <Picker
            testID="Picker"
            date={date}
            onDateChange={this.handleChange}
            mode={mode}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            locale={locale}
          />
        </Container>
      </Modal>
    )
  }
}

DatePicker.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  mode: PropTypes.oneOf(['datetime', 'date', 'time']),
  maximumDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  minimumDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  text: PropTypes.shape({
    cancel: PropTypes.string,
    confirm: PropTypes.string,
  }),
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  locale: PropTypes.string,
}

export { DatePicker }
