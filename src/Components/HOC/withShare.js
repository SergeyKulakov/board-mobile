import React from 'react'
import _ from 'lodash'
import { CLIENT_URL } from 'react-native-dotenv'
import { getJobImage, getProfileAvatar } from 'Helpers/getImageUri'
import { getShortUserName } from 'Helpers/user'
import qs from 'qs'

import { Linking, Platform } from 'react-native'
import Mailer from 'react-native-mail'
import createEmail from 'Helpers/emailNotificationGenerator'
import { logoPath } from 'Constants/api'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getUser } from 'Redux/selectors/user'

import { withNamespaces } from './index'

function withShare(Component) {
  return class extends React.Component {
    state = {
      isRequest: false,
    }

    share = body => {
      const { t } = this.props
      const title = `${t('sign.spotJobs')} ${t('notifications.notifications')}`

      if (Platform.OS === 'ios') {
        const query = qs.stringify({
          subject: title,
          body,
        })

        Linking.openURL(`mailto:?${query}`)
      } else {
        Mailer.mail(
          {
            subject: title,
            body,
            isHTML: true,
          },
          () => {},
        )
      }
    }

    handleJobShare = job => {
      const { t, user } = this.props

      let jobImage = _.get(job, 'pics[0]')
      const shortUserName = getShortUserName(
        user.family_name,
        user.given_name,
        user.username,
      )

      if (jobImage) jobImage = getJobImage(job._id, jobImage)
      else {
        // prettier-ignore
        jobImage = 'https://spotjobs-images-097579889258-us-east-1.s3.amazonaws.com/email-icons/job-placeholder.png(1 kB)'
      }

      const jobUrl = `${CLIENT_URL}/find-jobs/list/${job._id}`

      const userUrl = `${CLIENT_URL}/find-help/${user.username}`

      const body = createEmail({
        title: `${t('sign.spotJobs')} ${t('notifications.notifications')}`,
        // prettier-ignore
        message: `<p>${t('notifications.hello')} ${t('notifications.followingJob')} <a href="${jobUrl}">${job.title}</a> ${t('notifications.wasRecomended')} <a href="${userUrl}">${shortUserName}</a><br/> ${t('notifications.shareLink')}</p>`,
        buttonText: t('notifications.viewDetails'),
        buttonPath: jobUrl,
        logoUrl: logoPath,
        imageUrl: jobImage,
      })

      this.share(body)
    }

    handleSPShare = profile => {
      const { user, t } = this.props

      const shortUserName = getShortUserName(
        user.family_name,
        user.given_name,
        user.username,
      )

      const shortProfileName = getShortUserName(
        profile.family_name,
        profile.given_name,
        profile.username,
      )

      const avatar = profile.avatarURL
        ? getProfileAvatar(profile.avatarURL, profile.username)
        : 'https://spotjobs-images-097579889258-us-east-1.s3.amazonaws.com/email-icons/avatar-placeholder.gif(5 kB)'

      const profileUrl = `${CLIENT_URL}/find-help/${profile.username}`

      const userUrl = `${CLIENT_URL}/find-help/${user.username}`

      const body = createEmail({
        title: `${t('sign.spotJobs')} ${t('notifications.notifications')}`,
        // prettier-ignore
        message: `<span>${t('notifications.hello')} ${t('notifications.profileOfServiceProvider')} </span><a href="${profileUrl}" style="color: blue">${shortProfileName}</a><span> ${t('notifications.wasRecomended')} </span><a href="${userUrl}" style="color: blue">${shortUserName}</a><br/><span> ${t('notifications.shareLink')}</span>`,
        buttonText: t('notifications.viewDetails'),
        buttonPath: profileUrl,
        logoUrl: logoPath,
        imageUrl: avatar,
      })

      this.share(body)
    }

    render() {
      const { isRequest } = this.state

      return (
        <Component
          isShareRequest={isRequest}
          onJobShare={this.handleJobShare}
          onSPShare={this.handleSPShare}
          {...this.props}
        />
      )
    }
  }
}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  connect(selectors),
  withNamespaces,
  withShare,
)
