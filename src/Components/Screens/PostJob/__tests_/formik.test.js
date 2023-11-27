import _ from 'lodash'
import formigConfig from '../formik'
import { initialValues } from '../config'

describe('PostJob.formik', () => {
  describe('get initial values', () => {
    it('without isEditMode', () => {
      const values = formigConfig.mapPropsToValues({
        job: {},
        isEditMode: false,
      })

      expect(values).toStrictEqual(initialValues)
    })

    it('with isEditMode and job', () => {
      const values = formigConfig.mapPropsToValues({
        job: {
          streetAddress: 'streetAddress',
          city: 'city',
          country: 'country',
          state: 'state',
          zipCode: '1234',
          geolocation: '12.321314/54.3214123',
          category: {},
          currency: 'USD',
          title: 'title',
          description: 'description',
          budget: '321',
          pics: [],
          videoLinks: [],
          doneBefore: 1570540025729,
          expiryDate: 1570540025729,
        },
        isEditMode: true,
      })

      expect(values).toStrictEqual({
        address: 'streetAddress',
        city: 'city',
        country: 'country',
        state: 'state',
        zipCode: '1234',
        lat: '12.321314',
        lon: '54.3214123',
        category: {},
        currencyCode: 'USD',
        title: 'title',
        description: 'description',
        budget: '321',
        pics: [],
        videoLinks: [],
        doneBefore: new Date(1570540025729),
        expiryDate: new Date(1570540025729),
        isRequest: false,
        isSuccess: false,
      })
    })
  })

  describe('handleSubmit', () => {
    const serverError = {
      payload: {
        code: 'code',
      },
    }
    const getProps = (isEditMode, isSuccessful) => ({
      onCreateJob: jest.fn((request, callback) => {
        setTimeout(() => {
          callback({
            error: isSuccessful ? undefined : serverError,
          })
        }, 1000)
      }),
      navigate: {
        pop: jest.fn(),
      },
      onUpdateJob: jest.fn((jobId, request, callback) => {
        setTimeout(() => {
          callback({
            error: isSuccessful
              ? undefined
              : {
                  payload: { code: 'code' },
                },
          })
        }, 1000)
      }),
      job: {
        _id: 'jobId',
        streetAddress: 'address',
        city: 'city',
        country: 'country',
        state: 'state',
        zipCode: '1234123',
        geolocation: '12.42132/32.321423',
        service: {},
        currency: 'USD',
        title: 'title',
        description: undefined,
        budget: '1342',
        pics: [],
        videoLinks: [],
        doneBefore: 1570540025729,
        expiryDate: 1570540025729,
      },
      isEditMode,
      onShowPuck: jest.fn(
        ({ callback }) => _.isFunction(callback) && callback(),
      ),
      getError: jest.fn(),
    })
    const getValues = () => ({
      pics: [],
      category: {
        categoryId: '1234',
        _id: '4123sd',
      },
      currencyCode: 'USD',
      title: 'title',
      doneBefore: 1570540025729,
      expiryDate: 1570540025729,
      description: 'description',
      budget: '23124',
      videoLinks: [],
      address: 'address',
      city: 'city',
      state: 'state',
      zipCode: '324123',
      country: 'country',
      lat: 13.42134,
      lon: 32.42134,
    })

    describe('create job', () => {
      it('successful', done => {
        const values = getValues()
        const otherProps = {
          props: getProps(false, true),
          setFieldValue: jest.fn(),
        }
        formigConfig.handleSubmit(values, otherProps)

        expect(otherProps.setFieldValue).toHaveBeenCalledTimes(1)
        expect(otherProps.setFieldValue).toHaveBeenCalledWith('isRequest', true)

        expect(otherProps.props.onCreateJob).toHaveBeenCalledTimes(1)
        expect(otherProps.props.onShowPuck).not.toHaveBeenCalled()
        expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(otherProps.setFieldValue).toHaveBeenCalledTimes(2)
          expect(otherProps.setFieldValue).toHaveBeenCalledWith(
            'isRequest',
            false,
          )
          expect(otherProps.props.onShowPuck).toHaveBeenCalledTimes(1)
          expect(otherProps.props.navigate.pop).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })

      it('failure', done => {
        const values = getValues()
        const otherProps = {
          props: getProps(false, false),
          setFieldValue: jest.fn(),
        }
        formigConfig.handleSubmit(values, otherProps)

        expect(otherProps.props.onCreateJob).toHaveBeenCalledTimes(1)
        expect(otherProps.props.onShowPuck).not.toHaveBeenCalled()
        expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()
        expect(otherProps.props.getError).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(otherProps.props.onShowPuck).toHaveBeenCalledTimes(1)
          expect(otherProps.props.getError).toHaveBeenCalledTimes(1)
          expect(otherProps.props.getError).toHaveBeenCalledWith(serverError)
          expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()
          done()
        }, 1100)
      })
    })
    describe('update job', () => {
      it('successful', done => {
        const values = getValues()
        const otherProps = {
          props: getProps(true, true),
          setFieldValue: jest.fn(),
        }

        formigConfig.handleSubmit(values, otherProps)

        expect(otherProps.setFieldValue).toHaveBeenCalledTimes(1)
        expect(otherProps.setFieldValue).toHaveBeenCalledWith('isRequest', true)

        expect(otherProps.props.onUpdateJob).toHaveBeenCalledTimes(1)
        expect(otherProps.props.onShowPuck).not.toHaveBeenCalled()
        expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()
        expect(otherProps.props.getError).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(otherProps.props.getError).not.toHaveBeenCalled()
          expect(otherProps.props.onShowPuck).toHaveBeenCalledTimes(1)
          expect(otherProps.props.navigate.pop).toHaveBeenCalledTimes(1)
          expect(otherProps.setFieldValue).toHaveBeenCalledTimes(2)
          expect(otherProps.setFieldValue).toHaveBeenCalledWith(
            'isRequest',
            false,
          )
          done()
        }, 1100)
      })

      it('failure', done => {
        const values = getValues()
        const otherProps = {
          props: getProps(true, false),
          setFieldValue: jest.fn(),
        }

        formigConfig.handleSubmit(values, otherProps)

        expect(otherProps.setFieldValue).toHaveBeenCalledTimes(1)
        expect(otherProps.setFieldValue).toHaveBeenCalledWith('isRequest', true)

        expect(otherProps.props.onUpdateJob).toHaveBeenCalledTimes(1)
        expect(otherProps.props.onShowPuck).not.toHaveBeenCalled()
        expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()
        expect(otherProps.props.getError).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(otherProps.props.onShowPuck).toHaveBeenCalledTimes(1)
          expect(otherProps.props.getError).toHaveBeenCalledTimes(1)
          expect(otherProps.props.getError).toHaveBeenCalledWith(serverError)
          expect(otherProps.props.navigate.pop).not.toHaveBeenCalled()

          expect(otherProps.setFieldValue).toHaveBeenCalledTimes(2)
          expect(otherProps.setFieldValue).toHaveBeenCalledWith(
            'isRequest',
            false,
          )
          done()
        }, 1100)
      })
    })
  })
})
