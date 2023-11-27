import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import _ from 'lodash'
import moment from 'moment'

import { LocationAutocomplete as InputField } from 'Components/UI'
import { DatePicker } from 'Components/Blocks'
import { WrapperTitle } from '../WrapperTitle'

import {
  DONE_BEFORE,
  EXPIRATION_DATE,
  getDoneBeforeDate,
  getExpirationDate,
} from './config'
import { Container, Block, Header, ErrorText } from './style'

class DatesBlock extends PureComponent {
  state = {
    showModalId: null,
    minDate: new Date(
      moment()
        .add({ hour: 2 })
        .valueOf(),
    ),
  }

  handleOpenModal = id => this.setState({ showModalId: id })

  handleCloseModal = () => this.setState({ showModalId: null })

  handleSetBeforeDate = date => {
    const { onSetBeforeDate } = this.props

    this.handleCloseModal()
    onSetBeforeDate(date)
  }

  handleSetExpiryDate = date => {
    const { onSetExpiryDate } = this.props

    this.handleCloseModal()
    onSetExpiryDate(date)
  }

  render() {
    const { text, values, errors, touched } = this.props
    const { showModalId, minDate } = this.state

    return (
      <Container>
        <Header>
          <WrapperTitle isError={!_.isEmpty(errors) && !_.isEmpty(touched)}>
            {text.title}
          </WrapperTitle>
        </Header>
        <Block mb={10}>
          <InputField
            placeholder={text.doneBefore}
            label={values.doneBefore && text.doneBefore}
            value={getDoneBeforeDate(values.doneBefore)}
            onClick={() => this.handleOpenModal(DONE_BEFORE)}
            isError={errors.doneBefore && touched.doneBefore}
          />
          {touched.doneBefore && errors.doneBefore ? (
            <ErrorText>{text.getError(errors.doneBefore)}</ErrorText>
          ) : null}
        </Block>
        <Block>
          <InputField
            placeholder={text.expDate}
            label={values.expiryDate && text.expDate}
            value={getExpirationDate(values.expiryDate)}
            onClick={() => this.handleOpenModal(EXPIRATION_DATE)}
            isError={errors.expiryDate && touched.expiryDate}
          />
          {touched.expiryDate && errors.expiryDate ? (
            <ErrorText>{text.getError(errors.expiryDate)}</ErrorText>
          ) : null}
        </Block>

        <DatePicker
          testID="doneBeforeDate"
          onCancel={this.handleCloseModal}
          text={text}
          date={values.doneBefore || minDate}
          mode="date"
          locale={i18n.locale}
          onSubmit={this.handleSetBeforeDate}
          visible={showModalId === DONE_BEFORE}
          minimumDate={minDate}
        />

        <DatePicker
          testID="expiryDate"
          onCancel={this.handleCloseModal}
          text={text}
          date={values.expiryDate || minDate}
          mode="datetime"
          locale={i18n.locale}
          onSubmit={this.handleSetExpiryDate}
          visible={showModalId === EXPIRATION_DATE}
          minimumDate={minDate}
        />
      </Container>
    )
  }
}

DatesBlock.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    doneBefore: PropTypes.string,
    expDate: PropTypes.string,
    getError: PropTypes.func,
  }),
  values: PropTypes.shape({
    doneBefore: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    expiryDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }),
  errors: PropTypes.shape({
    doneBefore: PropTypes.string,
    expiryDate: PropTypes.string,
  }),
  touched: PropTypes.shape({
    doneBefore: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    expiryDate: PropTypes.bool,
  }),
  onSetBeforeDate: PropTypes.func,
  onSetExpiryDate: PropTypes.func,
}

export { DatesBlock }
