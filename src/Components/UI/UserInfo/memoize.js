import memoize from 'memoize-one'
import { getShortUserName } from 'Helpers/user'

export const getUserName = memoize(getShortUserName)
