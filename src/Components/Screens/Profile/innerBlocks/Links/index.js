import React from 'react'
import PropTypes from 'prop-types'

import { ShadowBox } from 'Components/UI'
import { LinkPreview } from 'Components/Blocks'

const Links = ({ values, setFieldValue, toast, isPremium, text }) => {
  const handleAdd = ({ key, link, image, title, description }) => {
    if (key === 'videoLinks' && !isPremium && values.videoLinks.length === 1) {
      toast(text.videoLinksLengthError)
      return
    }

    if (
      key === 'websiteLinks' &&
      !isPremium &&
      values.websiteLinks.length === 1
    ) {
      toast(text.websiteLinksLengthErrorFree)
      return
    }

    if (key === 'websiteLinks' && values.websiteLinks.length === 5) {
      toast(text.websiteLinksLengthErrorPremium)
      return
    }

    setFieldValue(
      key,
      values[key].concat([
        {
          id: values[key].length + 1,
          link,
          image,
          info: title || description,
        },
      ]),
    )
  }

  const handleDelete = ({ key, id }) => {
    setFieldValue(key, values[key].filter(el => el.id !== id))
  }

  return (
    <>
      <ShadowBox title={text.videoLinkTitle}>
        <LinkPreview
          testID="videoLinks"
          inputType="video"
          title={text.videoLinkTitle}
          data={values.videoLinks}
          onAdd={value => handleAdd({ ...value, key: 'videoLinks' })}
          onDelete={id => handleDelete({ id, key: 'videoLinks' })}
          toast={toast}
        />
      </ShadowBox>

      <ShadowBox title={text.websiteLinkTitle}>
        <LinkPreview
          testID="websiteLinks"
          title={text.websiteLinkTitle}
          data={values.websiteLinks}
          onAdd={value => handleAdd({ ...value, key: 'websiteLinks' })}
          onDelete={id => handleDelete({ id, key: 'websiteLinks' })}
          toast={toast}
          disabledLoading
        />
      </ShadowBox>
    </>
  )
}

Links.propTypes = {
  text: PropTypes.object.isRequired,
  values: PropTypes.object, // from formik
  setFieldValue: PropTypes.func, // from formik
  toast: PropTypes.func.isRequired,
  isPremium: PropTypes.bool,
}

export { Links }
