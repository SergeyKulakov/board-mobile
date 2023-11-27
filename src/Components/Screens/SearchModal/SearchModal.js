import React from 'react'
import PropTypes from 'prop-types'

import { withFormik } from 'formik'

import { ServicesAutocomplete } from 'Components/Blocks'
import { Header } from './innerBlocks'

import { Container, Content } from './style'

const SearchModal = ({
  navigate,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  onSubmit,
}) => {
  const handleServiceSelect = service => {
    onSubmit({ service })
    navigate.hideModal()
  }

  return (
    <Container>
      <Header
        value={values.keywords}
        onBackClick={navigate.hideModal}
        onBlur={handleBlur('keywords')}
        onChange={handleChange('keywords')}
        onSubmit={handleSubmit}
      />
      <Content>
        <ServicesAutocomplete
          value={values.keywords}
          onSelect={handleServiceSelect}
        />
      </Content>
    </Container>
  )
}

SearchModal.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  navigate: PropTypes.object,
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default withFormik({
  mapPropsToValues: () => ({
    keywords: '',
  }),
  handleSubmit: ({ keywords }, { props: { onSubmit, navigate } }) => {
    onSubmit({ keywords })
    navigate.hideModal()
  },
})(SearchModal)
