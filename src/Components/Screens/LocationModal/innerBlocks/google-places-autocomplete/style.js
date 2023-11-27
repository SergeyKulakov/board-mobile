import { PixelRatio } from 'react-native'
import { colors, metrics } from 'Themes'

export const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  powered: {},
  listView: {},
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: metrics.screenHeight,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
}
