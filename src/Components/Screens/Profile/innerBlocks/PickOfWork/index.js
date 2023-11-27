import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import { ShadowBox } from 'Components/UI'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { UploadImages } from 'Components/Blocks'

const PickOfWork = ({
  values,
  setFieldValue,
  userId,
  toast,
  isPremium,
  text,
}) => {
  const handleAdd = base64 => {
    if (!isPremium && values.picsOfWork.length >= 5) {
      toast(text.picksOfWorkLengthErrorFree)
      return
    }

    if (values.picsOfWork.length >= 50) {
      toast(text.picksOfWorkLengthErrorPremium)
      return
    }

    setFieldValue(
      'picsOfWork',
      values.picsOfWork.concat([
        {
          id: values.picsOfWork.length,
          image: `data:image/jpeg;base64,${base64}`,
        },
      ]),
    )
  }

  const handleDelete = id => {
    setFieldValue('picsOfWork', values.picsOfWork.filter(el => el.id !== id))
  }

  return (
    <ShadowBox>
      <UploadImages
        testID="UploadImages"
        text={text.UploadImages}
        toast={toast}
        userId={userId}
        type={profileImageTypes.picsOfWork}
        data={values.picsOfWork}
        onAdd={handleAdd}
        onDelete={handleDelete}
        title={text.title}
      />
    </ShadowBox>
  )
}

PickOfWork.propTypes = {
  text: PropTypes.object.isRequired,
  toast: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  values: PropTypes.object, // from formik
  setFieldValue: PropTypes.func, // from formik
  isPremium: PropTypes.bool,
}

export { PickOfWork }
