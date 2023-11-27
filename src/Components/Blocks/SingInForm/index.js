import { compose } from 'redux'
import { withFormik } from 'formik'

import withNamespaces from 'Components/HOC/withNamespaces'

import { yupConfig } from './yup'

import Component from './SingInForm'

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: '',
      isRemember: false,
    }),
    validationSchema: yupConfig,
    handleSubmit: (values, { props }) => {
      const { onSignIn } = props

      onSignIn(values)
    },
  }),
  withNamespaces,
)(Component)
