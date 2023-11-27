import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import { RefreshControl, Platform } from 'react-native'
import { ScreenLoader } from 'Components/Blocks'
import { CheckRow, Button, SubscriptionSelect } from 'Components/UI'

import { Header } from './innerBlocks'
import {
  Container,
  Content,
  WhiteBox,
  BoxHeader,
  PopularText,
  HeaderRow,
  Title,
  SubTitle,
  Price,
  BoxContent,
  ListRow,
  ButtonWrapper,
  Line,
  SelectWrapper,
  TotalPrice,
  PointsWrapper,
  PointsCount,
  PointsText,
  PremiumWrapper,
  PremiumIcon,
  PremiumIconWrapper,
  PremiumText,
  WhiteLine,
  WhiteText,
  PayPalIcon,
  styles,
} from './style'
import { features } from './config'

class Subscriptions extends PureComponent {
  state = {
    pts: 24,
    selectedPlanIndex: null,
    isRequest: false,
  }

  componentDidMount() {
    this.handleUpdateData()
  }

  loadPlans = () => {
    const { onLoadPlans, onShowPuck, getError } = this.props

    this.setState({ isRequest: true }, () => {
      onLoadPlans(({ error }) => {
        this.setState({ isRequest: false })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        }
      })
    })
  }

  loadPrice = () => {
    const { onLoadPrice, onShowPuck, getError } = this.props

    onLoadPrice(({ error }) => {
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      }
    })
  }

  handleIncrement = () => {
    const { pts } = this.state
    let nextPts = pts

    switch (pts) {
      case 24:
        nextPts = 50
        break
      case 50:
        nextPts = 100
        break
      case 100:
        nextPts = 500
        break
      case 500:
        break
      default:
        nextPts = 24
    }

    this.setState({ pts: nextPts })
  }

  handleDecrement = () => {
    const { pts } = this.state
    let nextPts = pts

    switch (pts) {
      case 24:
        break
      case 50:
        nextPts = 24
        break
      case 100:
        nextPts = 50
        break
      case 500:
        nextPts = 100
        break
      default:
        nextPts = 500
    }

    this.setState({ pts: nextPts })
  }

  handleUpdateData = () => {
    this.loadPlans()
    this.loadPrice()
  }

  handleBuyPoints = () => {
    const { onBuy } = this.props
    const { pts } = this.state
    onBuy(pts)
  }

  handleBuyPlan = plan => {
    const { onBuy } = this.props
    onBuy(plan)
  }

  renderPlan = plan => {
    const { t, plans, price } = this.props
    const { selectedPlanIndex } = this.state

    if (_.isEmpty(plans) || !plan) return null

    const typeName =
      plan.type === 'monthPremiumSubscriptionCost' ? 'monthly' : 'yearly'

    const isPremiumPlan = typeName === 'yearly'

    const planCost = (price * plan.val).toFixed(2)

    return (
      <WhiteBox key={plan.type}>
        <BoxHeader>
          {isPremiumPlan ? (
            <PopularText>{t('subscriptionScreen.mostPopular')}</PopularText>
          ) : null}
          <HeaderRow>
            <Title>{t(`subscriptionScreen.${typeName}`)}</Title>
            <Title>
              {String(plan.val)} {t('homePage.pts.')}
            </Title>
          </HeaderRow>
          <HeaderRow>
            <SubTitle>{t('subscriptionScreen.subscriptions')}</SubTitle>
            <Price>(${String(planCost)})</Price>
          </HeaderRow>
        </BoxHeader>
        {isPremiumPlan ? <Line /> : null}
        {isPremiumPlan ? (
          <BoxContent>
            {features.map(el => (
              <ListRow key={el}>
                <CheckRow text={t(`subscriptionScreen.${el}`)} />
              </ListRow>
            ))}
            <ButtonWrapper>
              <Button
                disabled={selectedPlanIndex === plan.type}
                style={styles.Button}
                onClick={() => this.handleBuyPlan(plan)}
                AfterIcon={Platform.OS === 'ios' ? null : <PayPalIcon />}
              >
                {t('subscriptionScreen.buy')}
              </Button>
            </ButtonWrapper>
          </BoxContent>
        ) : (
          <BoxContent>
            <ButtonWrapper>
              <Button
                disabled={selectedPlanIndex === plan.type}
                style={styles.Button}
                onClick={() => this.handleBuyPlan(plan)}
                AfterIcon={Platform.OS === 'ios' ? null : <PayPalIcon />}
              >
                {t('subscriptionScreen.buy')}
              </Button>
            </ButtonWrapper>
          </BoxContent>
        )}
      </WhiteBox>
    )
  }

  renderPoints = () => {
    const { t, points, pointsExpiryDate } = this.props

    if (points === 0 || !pointsExpiryDate) {
      return (
        <PointsWrapper>
          <PointsCount>{points || 0}</PointsCount>
          <PointsText>{t('subscriptionScreen.points')}</PointsText>
        </PointsWrapper>
      )
    }

    return (
      <PointsWrapper>
        <BoxHeader>
          <HeaderRow>
            <Title>{String(points)}</Title>
            {moment(pointsExpiryDate).isValid() ? (
              <Title>{moment(pointsExpiryDate).format('DD MMM YYYY')}</Title>
            ) : null}
          </HeaderRow>
          <HeaderRow>
            <SubTitle>{t('subscriptionScreen.points')}</SubTitle>
            <SubTitle>{t('findJobPage.expiryDate')}</SubTitle>
          </HeaderRow>
        </BoxHeader>
      </PointsWrapper>
    )
  }

  _renderPremiumPlan = () => {
    const { t, plans, price, activePlanType } = this.props

    if (_.isEmpty(plans)) return null
    const plan = plans[activePlanType]
    if (!plan) return null
    const secondPlan = _.omit(plans.yearly, 'features')

    const planCost = (price * plan.val).toFixed(2)

    const typeName =
      plan.type === 'monthPremiumSubscriptionCost' ? 'monthly' : 'yearly'

    return (
      <>
        <PremiumWrapper>
          <PremiumIconWrapper>
            <PremiumIcon />
          </PremiumIconWrapper>
          <PremiumText>{t('subscriptionScreen.premiumMember')}</PremiumText>
        </PremiumWrapper>
        <WhiteLine />
        <WhiteText>{t('subscriptionScreen.currentPlan')}:</WhiteText>
        <WhiteBox>
          <BoxHeader>
            <HeaderRow>
              <Title>{t(`subscriptionScreen.${typeName}`)}</Title>
              <Title>
                {String(plan.val)} {t('homePage.pts.')}
              </Title>
            </HeaderRow>
            <HeaderRow>
              <SubTitle>{t('subscriptionScreen.subscriptions')}</SubTitle>
              <Price>(${String(planCost)})</Price>
            </HeaderRow>
          </BoxHeader>
        </WhiteBox>
        {plan.type === 'monthPremiumSubscriptionCost' ? (
          <>
            <WhiteLine />
            <WhiteText>
              {t('subscriptionScreen.upgradeSubscription')}:
            </WhiteText>
            {this.renderPlan(secondPlan)}
          </>
        ) : null}
      </>
    )
  }

  render() {
    const {
      navigate,
      t,
      plans,
      user,
      price,
      activePlanType,
      isBuyRequest,
    } = this.props
    const { pts, isRequest } = this.state

    const totalCost = (price * pts).toFixed(2)

    return (
      <Container>
        <Header
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
        />
        <Content
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              refreshing={isRequest}
              onRefresh={this.handleUpdateData}
            />
          }
        >
          {user.isPremium && activePlanType
            ? this._renderPremiumPlan()
            : _.map(plans, this.renderPlan)}
          <WhiteBox>
            <BoxHeader>
              <HeaderRow>
                <Title>{t('subscriptionScreen.buyExtraPts')}</Title>
              </HeaderRow>
              <HeaderRow>
                <Price>
                  {t('subscriptionScreen.minPts')} 24
                  {t('subscriptionScreen.pts')}
                </Price>
              </HeaderRow>
            </BoxHeader>
            <BoxContent>
              <SelectWrapper>
                <SubscriptionSelect
                  value={pts}
                  onIncrement={this.handleIncrement}
                  onDecrement={this.handleDecrement}
                  min={10}
                />
                <TotalPrice>
                  {t('subscriptionScreen.totalPts')} ${String(totalCost)}
                </TotalPrice>
                <ButtonWrapper>
                  <Button
                    style={styles.Button}
                    onClick={this.handleBuyPoints}
                    disabled={isBuyRequest}
                    AfterIcon={Platform.OS === 'ios' ? null : <PayPalIcon />}
                  >
                    {t('subscriptionScreen.buyExtraPts')}
                  </Button>
                </ButtonWrapper>
              </SelectWrapper>
            </BoxContent>
          </WhiteBox>
          <WhiteBox>
            <BoxHeader>{this.renderPoints()}</BoxHeader>
          </WhiteBox>
        </Content>
        <ScreenLoader visible={isBuyRequest} />
      </Container>
    )
  }
}

Subscriptions.propTypes = {
  user: PropTypes.object,
  plans: PropTypes.object,
  navigate: PropTypes.object,
  t: PropTypes.func,
  onShowPuck: PropTypes.func,
  onLoadPlans: PropTypes.func,
  getError: PropTypes.func,
  points: PropTypes.number,
  price: PropTypes.object,
  onLoadPrice: PropTypes.func,
  activePlanType: PropTypes.func,
  pointsExpiryDate: PropTypes.string,
  onBuy: PropTypes.func,
  isBuyRequest: PropTypes.bool,
}

export default Subscriptions
