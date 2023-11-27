import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  padding-left: 10;
  padding-right: 10;
  padding-top: 5;
  padding-bottom: 5;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const JobsDone = styled.Text`
  color: ${colors.textGray};
  font-size: 16;
`

export const JobsDoneCount = styled(JobsDone)`
  color: ${colors.jade};
  font-weight: bold;
  margin-right: 5;
`

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CommentsIconWrapper = styled.TouchableOpacity`
  padding-right: 10;
  padding-left: 10;
  border: solid 0 ${colors.disabledGray};
  border-left-width: 1;
  border-right-width: 1;
`

export const StarsIconWrapper = styled.View`
  padding-right: 10;
`

export const DistanceIconWrapper = styled.View`
  padding-left: 10;
`

export const Content = styled.View`
  padding-top: 20;
  padding-bottom: 15;
`

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`
