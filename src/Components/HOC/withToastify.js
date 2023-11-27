import React from 'react'
import { CustomElements } from 'Themes'
import _ from 'lodash'
import { toastTypes } from 'Constants/toast'

import Toast from '@rimiti/react-native-toastify'

export default function(Component) {
  return class extends React.PureComponent {
    _toastSuccess = null

    _toastError = null

    createSuccessToastRef = ref => {
      this._toastSuccess = ref
    }

    createErrorToastRef = ref => {
      this._toastError = ref
    }

    handleShowToast = (
      message,
      time = 3000,
      type = toastTypes.error,
      callback,
    ) => {
      switch (type) {
        case toastTypes.error:
          this._toastError.show(message, time)
          break
        case toastTypes.success:
          this._toastSuccess.show(message, time)
          break
        default:
          this._toastError.show(message, time)
          break
      }

      if (_.isFunction(callback)) {
        setTimeout(() => {
          callback()
        }, time + 100)
      }
    }

    render() {
      return (
        <>
          <Component {...this.props} toast={this.handleShowToast} />
          <Toast
            ref={this.createSuccessToastRef}
            {...CustomElements.getToastStyle(true)}
          />
          <Toast
            ref={this.createErrorToastRef}
            {...CustomElements.getToastStyle()}
          />
        </>
      )
    }
  }
}
