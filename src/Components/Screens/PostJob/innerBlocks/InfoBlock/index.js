import React from 'react'
import PropTypes from 'prop-types'

import { InputBlock, CurrencySelect } from 'Components/UI'
import { WrapperTitle } from '../WrapperTitle'

import {
  Container,
  Block,
  Header,
  BudgetContainer,
  InputContainer,
} from './style'

const InfoBlock = ({
  text,
  values,
  errors,
  touched,
  onBlur,
  onChange,
  setFieldTouched,
  onClickCurrency,
}) => (
  <Container>
    <Header>
      <WrapperTitle isError={errors.title && touched.title}>
        {text.title}
      </WrapperTitle>
    </Header>
    <Block>
      <InputBlock
        testID="infoInput"
        animatedLabel
        animatedLine
        onBlur={onBlur('title')}
        onChange={onChange('title')}
        value={values.title}
        label={text.jobTitle}
        onSetTouched={() => setFieldTouched('title')}
        errorMessage={
          touched.title && errors.title && text.getError(errors.title)
        }
      />
    </Block>
    <Block>
      <InputBlock
        testID="infoInput"
        animatedLabel
        animatedLine
        onBlur={onBlur('description')}
        onChange={onChange('description')}
        value={values.description}
        label={text.jobDescription}
        onSetTouched={() => setFieldTouched('description')}
        errorMessage={
          touched.description &&
          errors.description &&
          text.getError(errors.description)
        }
      />
    </Block>
    <BudgetContainer>
      <InputContainer>
        <InputBlock
          animatedLabel
          animatedLine
          numberMode
          onBlur={onBlur('budget')}
          onChange={onChange('budget')}
          value={values.budget}
          label={text.budget}
        />
      </InputContainer>
      <CurrencySelect onClick={onClickCurrency} value={values.currencyCode} />
    </BudgetContainer>
  </Container>
)

InfoBlock.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    budget: PropTypes.string,
    currencyCode: PropTypes.string,
  }),
  text: PropTypes.shape({
    title: PropTypes.string,
    jobTitle: PropTypes.string,
    jobDescription: PropTypes.string,
    budget: PropTypes.string,
    getError: PropTypes.func,
  }),
  errors: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    budget: PropTypes.string,
  }),
  touched: PropTypes.shape({
    title: PropTypes.bool,
    description: PropTypes.bool,
    budget: PropTypes.bool,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  setFieldTouched: PropTypes.func,
  onClickCurrency: PropTypes.func,
}

export { InfoBlock }
