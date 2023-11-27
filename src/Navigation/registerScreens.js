import React from 'react'
import { Navigation } from 'react-native-navigation'

// common
import WithNavigate from 'Components/HOC/WithNavigate/withNavigate'

// auth
import OnBoarding from 'Components/Screens/OnBoarding'
import Login from 'Components/Screens/Login'
import Registration from 'Components/Screens/Registration'
import ForgotPass from 'Components/Screens/ForgotPass'
import ConfirmResetPassword from 'Components/Screens/ConfirmResetPassword'
import ConfirmSignUp from 'Components/Screens/ConfirmSignUp'

// screens
import Home from 'Components/Screens/Home'
import Profile from 'Components/Screens/Profile'
import FindJobs from 'Components/Screens/FindJobs'
import FilterJobs from 'Components/Screens/FilterJobs'
import JobDescription from 'Components/Screens/JobDescription'
import PostJob from 'Components/Screens/PostJob'
import FindHelp from 'Components/Screens/FindHelp'
import ServiceProviderProfile from 'Components/Screens/ServiceProviderProfile'
import MyFavourites from 'Components/Screens/MyFavourites'
import MyJobs from 'Components/Screens/MyJobs'
import PeopleWhoApplied from 'Components/Screens/PeopleWhoApplied'
import MyRequests from 'Components/Screens/MyRequests'
import RateReview from 'Components/Screens/RateReview'
import TrackJobMap from 'Components/Screens/TrackJobMap'
import Notifications from 'Components/Screens/Notifications'
import Chats from 'Components/Screens/Chats'
import Chat from 'Components/Screens/Chat'
import Settings from 'Components/Screens/Settings'
import Subscriptions from 'Components/Screens/Subscriptions'
import Track from 'Components/Screens/Track'
import Reviews from 'Components/Screens/Reviews'
import Splash from 'Components/Screens/Splash'

// modals
import LocationModal from 'Components/Screens/LocationModal'
import ServicesModal from 'Components/Screens/ServicesModal'
import SubServicesModal from 'Components/Screens/SubServicesModal'
import GoogleMapModal from 'Components/Screens/GoogleMapModal'
import ConfirmEditEmailOrPhone from 'Components/Screens/ConfirmEditEmailOrPhone'
import ImagesSlider from 'Components/Screens/ImagesSlider'
import CurrencyModal from 'Components/Screens/CountriesCurrencyModal'
import SortedModal from 'Components/Screens/SortedModal'
import PhonesModal from 'Components/Screens/PhoneNumbersModal'
import SearchModal from 'Components/Screens/SearchModal'
import CancelJobModal from 'Components/Screens/CancelJobModal'
import SelectJobModal from 'Components/Screens/SelectJobModal'
import DeleteMyAccount from 'Components/Screens/DeleteMyAccount'
import MapModal from 'Components/Screens/MapModal'
import UserReport from 'Components/Screens/UserReport'

import * as routes from 'Constants/routes'

const registerScreens = (store, Provider) => {
  const registerScreen = (
    route,
    Screen,
    isDisableSideMenu = false,
    isModal = false,
  ) => {
    Navigation.registerComponentWithRedux(
      route,
      () => props => (
        <WithNavigate
          Component={Screen}
          isDisableSideMenu={isDisableSideMenu}
          isModal={isModal}
          {...props}
        />
      ),
      Provider,
      store,
    )
  }

  // auth
  registerScreen(routes.initial, Splash, true, true)
  registerScreen(routes.onBoarding, OnBoarding, true, true)
  registerScreen(routes.login, Login, true, true)
  registerScreen(routes.singUp, Registration, true, true)
  registerScreen(routes.confirmSignUp, ConfirmSignUp, true, true)
  registerScreen(routes.forgotPass, ForgotPass, true, true)
  registerScreen(routes.confirmResetPassword, ConfirmResetPassword, true, true)

  // screens
  registerScreen(routes.home, Home, true)
  registerScreen(routes.profile, Profile, true)
  registerScreen(routes.findJobs, FindJobs, true)
  registerScreen(routes.jobDescription, JobDescription)
  registerScreen(routes.postJob, PostJob)
  registerScreen(routes.findHelp, FindHelp, true)
  registerScreen(routes.serviceProviderProfile, ServiceProviderProfile)
  registerScreen(routes.myFavourites, MyFavourites, true)
  registerScreen(routes.myJobs, MyJobs, true)
  registerScreen(routes.seePeopleWhoApplied, PeopleWhoApplied, true)
  registerScreen(routes.myRequests, MyRequests, true)
  registerScreen(routes.ratingReview, RateReview, true)
  registerScreen(routes.filterJobs, FilterJobs, true)
  registerScreen(routes.trackJobMap, TrackJobMap, true)
  registerScreen(routes.notifications, Notifications)
  registerScreen(routes.chats, Chats, true)
  registerScreen(routes.settings, Settings)
  registerScreen(routes.subscriptions, Subscriptions)
  registerScreen(routes.track, Track)
  registerScreen(routes.reviews, Reviews)

  // modals
  registerScreen(routes.chat, Chat, true, true)
  registerScreen(routes.locationModal, LocationModal, true, true)
  registerScreen(routes.servicesModal, ServicesModal, true, true)
  registerScreen(routes.filterSubServices, SubServicesModal, true, true)
  registerScreen(routes.googleMapModal, GoogleMapModal, true, true)
  registerScreen(
    routes.verificationsPhoneOrEmail,
    ConfirmEditEmailOrPhone,
    true,
    true,
  )
  registerScreen(routes.imagesSlider, ImagesSlider, true, true)
  registerScreen(routes.currencyModal, CurrencyModal, true, true)
  registerScreen(routes.sortedModal, SortedModal, true, true)
  registerScreen(routes.phonesModal, PhonesModal, true, true)
  registerScreen(routes.searchModal, SearchModal, true, true)
  registerScreen(routes.canceledModal, CancelJobModal, true, true)
  registerScreen(routes.selectJob, SelectJobModal, true, true)
  registerScreen(routes.deleteMyAccount, DeleteMyAccount, true, true)
  registerScreen(routes.mapModal, MapModal, true, true)
  registerScreen(routes.report, UserReport, true, true)
}

export default registerScreens
