import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isString, isFunction } from 'lodash'
import { getShortUserName } from 'Helpers/user'

import { ShadowBox, Report, UserInfo } from 'Components/UI'

import { TouchableWithoutFeedback } from 'react-native'

import { Container, Loader, LoaderWrapper, Title, styles } from './style'

class DoerInfo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRequest: isString(props.doerId),
    }
  }

  componentDidMount() {
    const { doerId } = this.props

    if (isString(doerId)) this.loadSPProfile()
  }

  loadSPProfile = () => {
    const { onLoadSP, doerId } = this.props

    this.setState({ isRequest: true }, () => {
      onLoadSP(doerId, () => this.setState({ isRequest: false }))
    })
  }

  render() {
    const {
      t,
      doerId,
      profile,
      onClick,
      onReviewsClick,
      onClickReport,
      user,
    } = this.props
    const { isRequest } = this.state

    if (!isString(doerId)) return null

    return (
      <TouchableWithoutFeedback
        onPress={onClick}
        disabled={!isFunction(onClick)}
      >
        {isRequest ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <Container>
            <ShadowBox style={styles.ShadowBox}>
              <Title>{t('jobDetail.serviceProvider')}</Title>
              <UserInfo {...profile} onCommentClick={onReviewsClick} />
            </ShadowBox>
            {user.username === doerId ? null : (
              <Report onClick={onClickReport}>
                {getShortUserName(
                  profile.given_name,
                  profile.family_name,
                  profile.username,
                )}
              </Report>
            )}
          </Container>
        )}
      </TouchableWithoutFeedback>
    )
  }
}

DoerInfo.propTypes = {
  onLoadSP: PropTypes.func,
  profile: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  t: PropTypes.func,
  doerId: PropTypes.string,
  onClick: PropTypes.func,
  onReviewsClick: PropTypes.func,
  onClickReport: PropTypes.func,
  user: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
}

export default DoerInfo
