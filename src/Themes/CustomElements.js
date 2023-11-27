import { colors, metrics } from 'Themes'

const getToastStyle = isSuccess => ({
  textStyle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  style: {
    width: metrics.screenWidth - 40,
    backgroundColor: isSuccess ? colors.jade : colors.red08,
  },
  position: 'top',
})

export default {
  getToastStyle,
}
