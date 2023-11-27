import { takeLatest } from 'redux-saga/effects'

// action types
import { SET_LANGUAGE, SET_SYSTEM_LANGUAGE } from 'Redux/actions/language'
import {
  SIGN_OUT,
  SIGN_IN,
  REFRESH_TOKENS,
  FEDERATED_SIGN_IN,
  REFRESH_TOKEN,
  UPDATE_TOKEN,
} from 'Redux/actions/auth'
import { API_CALL_FAILURE } from 'Constants/ids'
import { LOAD_SERVICES } from 'Redux/actions/services'
import { UPDATE_USER_ATTRIBUTES } from 'Redux/actions/user'
import { UPDATE_USER_JOB } from 'Redux/actions/postedJobs'
import { CANCEL_APPLIED_JOB } from 'Redux/actions/appliedJobs'
import { CREATE_REVIEW, UPDATE_REVIEW } from 'Redux/actions/review'
import { HIRE, APPLY_FOR_JOB } from 'Redux/actions/applications'
import { SEND_REQUEST, REJECT_REQUEST } from 'Redux/actions/requests'
import { ADS_VIEWED, BUY_POINTS } from 'Redux/actions/subscription'
import { DELETE_MY_ACCOUNT } from 'Redux/actions/settings'
import { MOUNT_CHANNELS } from 'Redux/actions/socket'
import { inSocketTypes } from 'Constants/socketEventTypes'
// sagas
import { onSetLanguage, onSetSystemLanguage } from './languages'
import {
  onSignOut,
  onSignIn,
  onSignInFailure,
  onFederatedSignIn,
  onUnauthorizedError,
} from './auth'
import { onLoadServices } from './services'
import { onUpdateUserAttributes, onDeleteAccount } from './user'
import { onUpdateJob, onHireSP } from './postedJobs'
import { onCreateReview } from './reviews'
import { onRefreshToken } from './refreshToken'
import { onCaceledAppliedJob, onUpdateSpecificJob } from './jobs'
import { onSendHiringRequest } from './requests'
import { onBuyPoints, onRedirectToPaypal } from './subscription'
import { onTrySocketAuth } from './socket'
import { onUpdateToken } from './onUpdateToken'

function* mySaga() {
  yield takeLatest(SIGN_OUT.REQUEST, onSignOut)

  yield takeLatest(SET_LANGUAGE.REQUEST, onSetLanguage)
  yield takeLatest(SET_SYSTEM_LANGUAGE, onSetSystemLanguage)
  yield takeLatest(LOAD_SERVICES.REQUEST, onLoadServices)
  yield takeLatest(UPDATE_USER_ATTRIBUTES.SUCCESS, onUpdateUserAttributes)
  yield takeLatest(SIGN_IN.SUCCESS, onSignIn)
  yield takeLatest(REFRESH_TOKENS.FAILURE, onSignInFailure)
  yield takeLatest(FEDERATED_SIGN_IN, onFederatedSignIn)
  yield takeLatest(MOUNT_CHANNELS.SUCCESS, onTrySocketAuth)

  yield takeLatest(UPDATE_USER_JOB.SUCCESS, onUpdateJob)
  yield takeLatest(HIRE.SUCCESS, onHireSP)
  yield takeLatest(CREATE_REVIEW.SUCCESS, onCreateReview)
  yield takeLatest(REFRESH_TOKEN, onRefreshToken)
  yield takeLatest(CANCEL_APPLIED_JOB.SUCCESS, onCaceledAppliedJob)
  yield takeLatest(SEND_REQUEST.SUCCESS, onSendHiringRequest)
  yield takeLatest(DELETE_MY_ACCOUNT.SUCCESS, onDeleteAccount)
  yield takeLatest(REJECT_REQUEST.SUCCESS, onUpdateSpecificJob)
  yield takeLatest(APPLY_FOR_JOB.SUCCESS, onUpdateSpecificJob)
  yield takeLatest(
    `socket/${inSocketTypes.Unauthorized.toUpperCase()}`,
    onTrySocketAuth,
  )
  yield takeLatest(UPDATE_TOKEN, onUpdateToken)
  yield takeLatest(ADS_VIEWED.REQUEST, onBuyPoints)
  yield takeLatest(BUY_POINTS.SUCCESS, onRedirectToPaypal)
  yield takeLatest(API_CALL_FAILURE, onUnauthorizedError)
  yield takeLatest(UPDATE_REVIEW.SUCCESS, onUpdateSpecificJob)
}

export default mySaga
