import { apiUrl, appBundleId } from 'Constants/api'

export const getRequestUrl = provider =>
  `${apiUrl}/auth/oauth/${provider}/authenticate?redirect_uri=${appBundleId}://oauth&only_tokens=1`
