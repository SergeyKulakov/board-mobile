import React from 'react'
import PropTypes from 'prop-types'

import { ShadowBox } from 'Components/UI/ShadowBox'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'

import { UploadImages } from 'Components/Blocks'

const PickUserId = ({ values, setFieldValue, userId, toast, text }) => {
  const handleAdd = base64 => {
    if (values.idPics.length >= 5) {
      toast(text.idPicksLengthError)
      return
    }
    setFieldValue(
      'idPics',
      values.idPics.concat([
        {
          id: values.idPics.length,
          image: `data:image/png;base64,${base64}`,
        },
      ]),
    )
  }

  const handleDelete = id => {
    setFieldValue('idPics', values.idPics.filter(el => el.id !== id))
  }

  return (
    <ShadowBox>
      <UploadImages
        testID="UploadImages"
        text={text.UploadImages}
        toast={toast}
        userId={userId}
        type={profileImageTypes.idPics}
        title={text.title}
        subTitle={text.subTitle}
        data={values.idPics}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </ShadowBox>
  )
}

PickUserId.propTypes = {
  text: PropTypes.object.isRequired,
  toast: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
}

export { PickUserId }
