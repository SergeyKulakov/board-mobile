import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10;
  padding-right: 10;
  padding-top: 20;
  padding-bottom: 20;
  border: solid 0 ${colors.disabledGray};
  border-bottom-width: 1;
  ${p => p.isDisabled && 'opacity: 0.7'};
`

export const Right = styled.View`
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

export const Left = styled.View`
  min-width: 50;
  flex-direction: row;
  justify-content: ${p => (p.isRight ? 'flex-end' : 'center')};
  padding-right: 5;
`

export const Title = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
  font-weight: bold;
`

export const SubTitle = styled.Text`
  font-size: 14;
  color: ${colors.disabledGray};
  margin-top: 3;
`

export const ArrowIcon = styled(Icon).attrs(() => ({
  name: 'angle-right',
  color: colors.textGray,
  size: 25,
}))``

export const SwitchWrapper = styled.View``
