import React from 'react'
import PropTypes from 'prop-types'

import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { ShadowBox } from 'Components/UI'

import { UploadImages } from 'Components/Blocks'
import { AreYourProSection } from '../blocks'
import {
  Container,
  ImagesContainer,
  AreYouProContainer,
  AreYouProInfoText,
} from './style'

const Certificates = ({
  text,
  values,
  setFieldValue,
  userId,
  toast,
  isPremium,
}) => {
  const handleAdd = base64 => {
    if (!isPremium && values.certificates.length === 1) {
      toast(text.UploadImages.certificatesLengthError)
      return
    }

    setFieldValue(
      'certificates',
      values.certificates.concat([
        {
          id: values.certificates.length,
          image: `data:image/png;base64,${base64}`,
        },
      ]),
    )
  }

  const handleDelete = id => {
    setFieldValue(
      'certificates',
      values.certificates.filter(el => el.id !== id),
    )
  }

  return (
    <ShadowBox>
      <Container>
        <AreYouProContainer>
          <AreYourProSection
            value={values.isPro}
            text={text.isPro}
            onChange={() => setFieldValue('isPro', !values.isPro)}
          />
          {values.isPro && (
            <AreYouProInfoText>{text.areYouProInfo}</AreYouProInfoText>
          )}
        </AreYouProContainer>
        <ImagesContainer>
          <UploadImages
            text={text.UploadImages}
            toast={toast}
            userId={userId}
            type={profileImageTypes.certificates}
            title={text.title}
            data={values.certificates}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        </ImagesContainer>
      </Container>
    </ShadowBox>
  )
}

Certificates.propTypes = {
  text: PropTypes.object.isRequired,
  toast: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  isPremium: PropTypes.bool,
}

export { Certificates }
