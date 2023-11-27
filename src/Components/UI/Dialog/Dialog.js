import React from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from 'react-native'
import _ from 'lodash'

import RNDialog, {
  DialogFooter,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog'

class Dialog extends React.Component {
  dialog = React.createRef()

  backHandler = null

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { isVisible, onClose } = this.props
    if (isVisible) {
      if (_.isFunction(onClose)) onClose()
      this.dialog.current.handleDismiss()
      return false
    }
    return true
  }

  handleDelete = () => {
    const { onDelete } = this.props

    this.dialog.current.handleDismiss()
    setTimeout(onDelete, 300)
  }

  render() {
    const { isVisible, editText, deleteText, onEdit, onClose, t } = this.props

    return (
      <RNDialog
        ref={this.dialog}
        visible={isVisible}
        onTouchOutside={onClose}
        width={0.9}
        rounded
        dialogAnimation={new ScaleAnimation()}
      >
        <DialogFooter>
          <DialogButton
            testID="editButton"
            text={editText || t('common.edit')}
            onPress={onEdit}
          />
          <DialogButton
            testID="deleteButton"
            text={deleteText || t('common.delete')}
            onPress={this.handleDelete}
          />
        </DialogFooter>
      </RNDialog>
    )
  }
}

Dialog.propTypes = {
  editText: PropTypes.string,
  deleteText: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  t: PropTypes.func,
}

Dialog.defaultProps = {
  isVisible: true,
}

export default Dialog
