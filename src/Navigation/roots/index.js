import authorizedRoot from './authorized'
import nonauthorizedRoot from './nonauthorized'

export default (isAuthorized, rootElementRoute) => {
  if (rootElementRoute) {
    return nonauthorizedRoot(rootElementRoute)
  }

  return isAuthorized ? authorizedRoot() : nonauthorizedRoot()
}
