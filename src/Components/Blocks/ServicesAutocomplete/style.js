import React from 'react'
import styled from 'styled-components/native'
import { SmallService as UISmallService } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
  padding-left: 10;
  padding-right: 10;
`

export const SmallService = styled(props => <UISmallService {...props} />)`
  margin-top: 5;
  margin-bottom: 5;
`
