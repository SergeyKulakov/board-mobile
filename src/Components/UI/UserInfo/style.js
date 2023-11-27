import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space } from 'styled-system'

export const AvatarContainer = styled.View`
  margin-right: 10;
`

export const CrownIconWrapper = styled.View`
  margin-left: 5;
`

export const DoneJobsText = styled.Text`
  font-size: 14;
  color: ${colors.red};
  font-weight: bold;
`

export const DoneNumber = styled.Text`
  font-size: 15;
  color: ${colors.red};
  font-weight: bold;
`

export const Header = styled.View`
  flex-direction: row;
`

export const HeaderInfoContainer = styled.View`
  flex-direction: column;
`

export const NameBlock = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10;
`

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10;
`

export const JobsDoneBlock = styled.View`
  flex-direction: row;
  align-items: center;
`

export const NameText = styled.Text`
  font-size: 18;
  color: ${colors.black};
  margin-right: 5;
  font-weight: bold;
`

export const BorderedContainer = styled.TouchableOpacity`
  border: solid 0 ${colors.frenchGray};
  border-left-width: ${p => (p.isFirst ? 0 : 1)};
  padding-right: 10;
  padding-left: 10;
  ${space};
`

export const styles = {
  InfoIcon: {
    size: 18,
  },
}
