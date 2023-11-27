import _ from 'lodash'
import shortId from 'shortid'
import { transformImages } from 'Helpers/images'
import ImagesManager from 'Services/Images/ImagesManager'
import { imageTypes } from 'Services/Constants/images.constants'

import { initialValues, yupConfig } from './config'

export default {
  validationSchema: yupConfig,
  mapPropsToValues: ({ job, isEditMode }) => {
    if (_.isObject(job) && !_.isEmpty(job) && isEditMode) {
      const values = {
        ...initialValues,
      }

      // location
      values.address = _.get(job, 'streetAddress', '')
      values.city = _.get(job, 'city', '')
      values.country = _.get(job, 'country', '')
      values.state = _.get(job, 'state', '')
      values.zipCode = _.get(job, 'zipCode', '')
      const geoCode = job.geolocation.split('/')
      values.lat = geoCode[0]
      values.lon = geoCode[1]
      // ---

      // other
      values.category = _.isObject(job.service)
        ? {
            ...job.service,
            parentCategory: job.category || {},
          }
        : job.category

      values.currencyCode = _.get(job, 'currency', '')
      values.title = _.get(job, 'title', '')
      values.description = _.get(job, 'description', '')
      values.budget = String(_.get(job, 'budget', ''))
      values.pics = (job.pics || []).map((el, index) => ({
        id: index,
        image: el,
      }))
      values.videoLinks = job.videoLinks || []
      // ---

      // dates
      values.doneBefore = new Date(job.doneBefore)
      values.expiryDate = new Date(job.expiryDate)
      // ---

      return values
    }

    return { ...initialValues }
  },
  handleSubmit: async (values, { props, setFieldValue }) => {
    const {
      onCreateJob,
      navigate,
      onUpdateJob,
      job,
      isEditMode,
      onShowPuck,
      getError,
    } = props
    const _id = shortId.generate()

    setFieldValue('isRequest', true)

    let jobPics

    try {
      if (!_.isEmpty(values.pics)) {
        const parsedPics = isEditMode
          ? transformImages(job.pics, values.pics)
          : values.pics.map(el => el.image)

        jobPics = await ImagesManager.updateImages(
          imageTypes.jobPics,
          parsedPics,
          {
            subfolder: isEditMode ? job._id : _id,
          },
        )
      }
    } catch (err) {
      setFieldValue('isRequest', false)
      return
    }

    let category
    let service

    if (values.category.categoryId) {
      category = values.category.categoryId
      service = values.category._id
    } else category = values.category._id

    const requestObg = {
      category,
      service,
      currency: values.currencyCode,
      title: values.title,
      doneBefore: values.doneBefore,
      expiryDate: values.expiryDate,
      description: values.description,
      budget: Number(values.budget),
      pics: _.isArray(jobPics) ? jobPics.reverse() : undefined,
      videoLinks: values.videoLinks.map(el => el.link),
      streetAddress: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      country: values.country,
      geolocation: `${values.lat}/${values.lon}`,
    }

    if (isEditMode && _.isObject(job) && _.has(job, '_id')) {
      onUpdateJob(job._id, requestObg, ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        } else {
          onShowPuck({
            callback: navigate.pop,
          })
        }
        setFieldValue('isRequest', false)
      })
    } else {
      onCreateJob(
        {
          _id,
          ...requestObg,
        },
        ({ error }) => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
              delay: 3000,
            })
          } else {
            onShowPuck({
              callback: navigate.pop,
            })
          }
          setFieldValue('isRequest', false)
        },
      )
    }
  },
}
