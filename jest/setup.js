import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MockAsyncStorage from 'mock-async-storage'

const mockImpl = new MockAsyncStorage()
jest.mock('@react-native-community/async-storage', () => mockImpl)

jest.mock('src/Components/HOC/index.js', () => ({
  withNamespaces: () => Component => Component,
  withPuck: () => Component => Component,
  withOrientation: () => Component => Component,
}))

jest.mock('src/Components/Blocks/index.js', () => ({
  LinkPreview: () => null,
  SocialButton: () => null,
  LicenseAgreement: () => null,
  UploadImages: () => null,
  ServiceProvidersList: () => null,
  ProviderProfileCard: () => null,
  ScreenLoader: () => null,
  Map: () => null,
  JobsList: () => null,
}))

jest.mock('src/Components/UI/index.js', () => ({
  ScreenTitle: () => null,
  Icon: () => null,
  HeartIcon: () => null,
  ShadowBox: () => null,
  BackIcon: () => null,
  GradientContainer: () => null,
  Modal: () => null,
  InputBlock: () => null,
  Button: () => null,
  TabNavigationElement: () => null,
  ProviderPhoto: () => null,
  Image: () => null,
  Dialog: () => null,
  ChatButton: () => null,
  ChatInput: () => null,
}))

jest.mock('src/Navigation/index.js', () => ({
  setupRoot: () => null,
}))

jest.mock('src/Services/Images/ProfileImagesManager', () => ({
  updateProfileImages: () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(['1234', '4321'])
      }, 10)
    }),
  putProfileImage: () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ filename: 'filename' })
      }, 10)
    }),
  getSignedURLForProfileImage: (_, src) => src,
}))

jest.mock('src/I18n', () => ({
  t: text => text,
}))

jest.mock('src/Themes/Metrics', () => ({
  screenWidth: 1000,
  screenHeight: 3214,
  paddingSmall: 10,
  widthPercentageToDP: () => 1000,
  heightPercentageToDP: () => 1000,
  fontPercantageToDP: () => 14,
  getWindowWidth: () => 1000,
  getWindowHeight: () => 1000,
}))

Enzyme.configure({ adapter: new Adapter() })
