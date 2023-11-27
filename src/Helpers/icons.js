import colors from 'Themes/Colors'
import _ from 'lodash'

export const getNavigationIconStyle = (icon, allSize = 20) => {
  const defaultProps = {
    size: allSize,
    color: colors.blue,
  }

  if (_.isString(icon) || !icon) {
    return {
      name: icon,
      ...defaultProps,
    }
  }

  return {
    type: icon.type,
    name: icon.name,
    color: icon.color || defaultProps.color,
    size: icon.size || defaultProps.size,
  }
}
