import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

const text = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
`

export const Container = styled.View`
  flex: 1;
`

export const BudgetText = styled.Text`
  font-size: 25;
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
`

export const Content = styled.View`
  padding-top: 10;
  padding-left: 7;
  padding-right: 7;
  padding-bottom: 7;
  width: 100%;
`

export const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const DateBlock = styled.View`
  flex-direction: column;
  padding-right: 5;
  width: 100%;
`

export const DateLabel = styled(text).attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  color: ${colors.red};
  font-weight: bold;
`

export const DateText = styled(text)``

export const DistanceBlock = styled.View`
  flex-direction: row;
  min-width: 70;
`

export const DistanceText = styled(text)``

export const Description = styled(text)`
  margin-top: 10;
  flex-direction: row;
`

export const DescriptionPlus = styled(text)`
  color: ${colors.blue};
`

export const JobTitle = styled.Text`
  font-size: 16;
  color: ${colors.black};
  font-weight: bold;
  margin-top: 5;
`

export const styles = {
  LinearGradient: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    style: {
      paddingBottom: 5,
      paddingTop: 5,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    colors: [colors.gradientEnd, colors.gradientStart, colors.gradientEnd],
  },
  DistanceIcon: {
    type: 'mi',
    name: 'location-on',
    size: 20,
    color: colors.red,
  },
}
