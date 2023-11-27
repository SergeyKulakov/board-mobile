import { termsInfo } from 'Config/amplify'
import { appBundleId, clientUrl } from 'Constants/api'

export const requestUrl = `${clientUrl}/terms-conditions?redirect_uri=${appBundleId}://oauth`
