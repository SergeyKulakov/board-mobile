import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as routes from 'Constants/routes'
import _ from 'lodash'
import memoize from 'memoize-one'
import { SectionList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { sortedService } from 'Helpers/services'

import {
  SliderAdvertising,
  PeopleList,
  ServicesList,
  ScreenLoader,
  NavigationMenu,
} from 'Components/Blocks'
import { ShadowBox } from 'Components/UI'

import { Header, Wrapper } from './innerBlocks'
import { getText } from './config'
import { Container, Block, ServicesListBlock, styles } from './style'

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      filterValue: '',
      text: getText(),
      loading: {
        serviceProviders: false,
        categories: false,
        serviceProviderProfile: false,
      },
    }

    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    this.setState({ text: getText() })
  }

  componentDidMount() {
    const {
      onLoadServices,
      onLoadUserData,
      onSetupSocket,
      isSocketConnected,
      onLoadPopularServiceProviders,
      onLoadNotifications,
    } = this.props

    onLoadUserData(() => {
      this.showVerifyInfo()
      if (!isSocketConnected) onSetupSocket()
      onLoadPopularServiceProviders()
      setTimeout(() => {
        onLoadNotifications()
      }, 1000)
    })

    this._loadPopularCategories()
    onLoadServices({})
  }

  getSearchProps = memoize((value, placeholder) => ({
    value,
    placeholder,
    onFocus: this.handleOpenSearchModal,
  }))

  showVerifyInfo = () => {
    const { user, t, onShowPuck, navigate } = this.props

    setTimeout(() => {
      if (
        user.email_verified !== 'true' ||
        user.phone_number_verified !== 'true'
      ) {
        onShowPuck({
          type: 'warning',
          message: t('apiErrors.profileNotComplete'),
          text: {
            submit: t('common.openProfileWarn'),
          },
          onSubmit: () => {
            navigate.push(routes.profile)
          },
        })
      } else if (!user.geolocation) {
        onShowPuck({
          type: 'warning',
          message: t('apiErrors.completeProfileError'),
          text: {
            submit: t('common.openProfileWarn'),
          },
          onSubmit: () => {
            navigate.push(routes.profile)
          },
        })
      }
    }, 150)
  }

  handleOpenSearchModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.searchModal, {
      onSubmit: this.handleSearch,
    })
  }

  handleSearch = ({ keywords, service }) => {
    const { navigate } = this.props
    setTimeout(() => {
      if (_.isObject(service)) {
        navigate.push(routes.findJobs, {
          defaultFilters: {
            services: [service],
          },
        })
      } else if (_.isString(keywords)) {
        navigate.push(routes.findJobs, {
          defaultFilters: { keywords },
        })
      }
    }, 300)
  }

  handleRefreshData = () => {
    const { onLoadUserData } = this.props
    this._loadPopularCategories()
    this._loadPopularServiceProviders()
    onLoadUserData()
  }

  handleClickService = service => {
    const { navigate } = this.props

    navigate.push(routes.findJobs, { category: service })
  }

  handlePointsClick = () => {
    const { navigate } = this.props

    navigate.push(routes.subscriptions)
  }

  handleClickServiceProvider = serviceProvider => {
    const { navigate } = this.props

    if (_.has(serviceProvider, 'username'))
      navigate.push(routes.serviceProviderProfile, {
        userId: serviceProvider.username,
      })
  }

  handleOpenServices = () => {
    const { navigate } = this.props

    navigate.push(routes.filterJobs, {
      onSubmit: filters => {
        navigate.push(routes.findJobs, {
          defaultFilters: filters,
        })
      },
    })
  }

  _loadPopularCategories = () => {
    const { navigate, onLoadPopularCategories } = this.props
    this._setLoading('categories', true)
    onLoadPopularCategories({
      callback: ({ error }) => {
        if (error) navigate.showModal(error.payload.message || error.payload)
        this._setLoading('categories', false)
      },
    })
  }

  _loadPopularServiceProviders = () => {
    const { onLoadPopularServiceProviders, navigate, getError } = this.props
    this._setLoading('serviceProviders', true)
    onLoadPopularServiceProviders(({ error }) => {
      if (error) navigate.showMessage(getError(error))
      this._setLoading('serviceProviders', false)
    })
  }

  _setLoading = (key, value) =>
    this.setState(prevState => ({
      loading: {
        ...prevState.loading,
        [key]: value,
      },
    }))

  _renderContent = () => {
    const {
      navigate,
      popularServiceProviders,
      popularCategories,
      isRequest,
      onShowAd,
      isAdsLoading,
    } = this.props
    const { text, loading } = this.state

    return (
      <>
        <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
        <Block mb={10}>
          <ShadowBox style={styles.ShadowBox}>
            <NavigationMenu />
          </ShadowBox>
        </Block>
        {_.isEmpty(popularCategories) ? null : (
          <Block mb={10}>
            <Wrapper
              title={text.popularCategories}
              onClickShowAll={this.handleOpenServices}
            >
              <ServicesListBlock>
                <ServicesList
                  data={sortedService(popularCategories)}
                  horizontal
                  title={text.popular}
                  getServiceTitle={text.getServiceTitle}
                  onClickItem={this.handleClickService}
                  withShadowBox={false}
                />
              </ServicesListBlock>
            </Wrapper>
          </Block>
        )}
        {_.isEmpty(popularServiceProviders) ? null : (
          <>
            <Block>
              <ShadowBox style={styles.PeopleList}>
                <PeopleList
                  text={text.PeopleList}
                  data={popularServiceProviders}
                  onClickHeaderLink={() => navigate.push(routes.findHelp)}
                  onClickItem={this.handleClickServiceProvider}
                />
              </ShadowBox>
            </Block>
            <ScreenLoader
              visible={loading.serviceProviderProfile || isRequest}
            />
          </>
        )}
        <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
      </>
    )
  }

  render() {
    const { navigate, user, isRequest, isAdsLoading, points } = this.props
    const { filterValue, text, loading } = this.state

    const searchProps = this.getSearchProps(filterValue, text.searchPlaceholder)

    return (
      <Container>
        <Header
          screenTitle={text.screenTitle}
          userId={user.username}
          avatar={user.avatarURL}
          isRequest={isRequest}
          onAvatarClick={() => navigate.push(routes.profile)}
          searchProps={searchProps}
          onOpenSidebar={navigate.showSidebar}
          pts={points}
          onPointsClick={this.handlePointsClick}
        />
        <SectionList
          testID="SectionList"
          keyExtractor={item => item.key}
          onRefresh={this.handleRefreshData}
          extraData={[
            loading.serviceProviders,
            loading.categories,
            isAdsLoading,
          ]}
          refreshing={loading.serviceProviders || loading.categories}
          listKey="home"
          sections={[
            { key: 'key', data: [' '], renderItem: this._renderContent },
          ]}
        />
      </Container>
    )
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  isRequest: PropTypes.bool,
  popularCategories: PropTypes.array,
  popularServiceProviders: PropTypes.array,
  navigate: PropTypes.object.isRequired,
  onLoadPopularServiceProviders: PropTypes.func.isRequired,
  onLoadPopularCategories: PropTypes.func.isRequired,
  onLoadServices: PropTypes.func,
  onLoadUserData: PropTypes.func,
  t: PropTypes.func,
  onShowPuck: PropTypes.func,
  onSetupSocket: PropTypes.func,
  isSocketConnected: PropTypes.bool,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  points: PropTypes.number,
  getError: PropTypes.func,
  onLoadNotifications: PropTypes.func,
}

export default Home
