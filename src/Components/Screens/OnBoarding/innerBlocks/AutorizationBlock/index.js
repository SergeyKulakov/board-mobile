import React from 'react'
import i18n from 'I18N'
import * as routes from 'Constants/routes'
import { setupRoot } from 'Navigation'

import { Button } from 'Components/UI'
import {
  Container,
  Text,
  Link,
  SingInBlock,
  SingInTextContainer,
} from './style'

const AutorizationBlock = () => (
  <Container>
    <Button
      text={i18n.t('sign.SignUp')}
      onClick={() => setupRoot(false, routes.singUp)}
    />
    <SingInBlock>
      <SingInTextContainer>
        <Text>{i18n.t('landingPage.haveAccount')} </Text>

        <Link onPress={() => setupRoot(false, routes.login)}>
          {i18n.t('sign.SignIn')}
        </Link>
      </SingInTextContainer>

      <Link onPress={() => setupRoot(false, routes.login)}>
        {i18n.t('findJobPage.Skip')}
      </Link>
    </SingInBlock>
  </Container>
)

export { AutorizationBlock }
