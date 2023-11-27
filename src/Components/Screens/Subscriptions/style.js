import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon } from 'Components/UI'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled(LinearGradient).attrs(() => ({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  colors: [colors.gradientStart, colors.gradientEnd],
}))`
  flex: 1;
`

export const Content = styled.ScrollView`
  flex: 1;
`

export const WhiteBox = styled.View`
  margin-top: 15;
  margin-bottom: 15;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 7;
  border-radius: 10;
  flex-direction: column;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
`

export const BoxHeader = styled.View`
  flex-direction: column;
  padding-top: 10;
  padding-left: 15;
  padding-right: 15;
  width: 100%;
  margin-bottom: 5;
`

export const Line = styled.View`
  margin-top: 15;
  border: solid 0 silver;
  border-top-width: 1;
  margin-bottom: 15;
`

export const PopularText = styled.Text`
  font-size: 20;
  color: ${colors.blue};
  font-weight: bold;
  margin-bottom: 5;
`

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5;
  margin-bottom: 5;
`

export const Title = styled.Text`
  font-size: 24;
  font-weight: bold;
  color: #000;
`

export const SubTitle = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
`

export const Price = styled(SubTitle)`
  font-weight: bold;
`

export const BoxContent = styled.View`
  padding-top: 5;
  flex-direction: column;
  padding-right: 15;
  padding-left: 15;
  padding-bottom: 15;
`

export const ListRow = styled.View`
  margin-bottom: 10;
`

export const ButtonWrapper = styled.View`
  margin-top: 15;
`

export const SelectWrapper = styled.View`
  margin-top: 10;
  margin-bottom: 10;
`

export const TotalPrice = styled.Text`
  text-align: center;
  align-self: center;
  font-size: 24;
  color: ${colors.textGray};
  font-weight: bold;
`

export const Footer = styled.View`
  background-color: #fff;
  flex-direction: column;
  margin-top: 20;
  padding-bottom: 20;
`

export const PointsWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  padding-bottom: 10;
`

export const PointsCount = styled.Text`
  font-size: 24;
  color: #000;
  font-weight: bold;
  margin-bottom: 10;
`

export const PointsText = styled.Text`
  font-size: 24;
  color: #000;
`

export const PremiumWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  padding-top: 15;
`

export const PremiumIcon = styled(Icon).attrs(() => ({
  type: 'mci',
  name: 'crown',
  size: 35,
  color: '#fff',
}))``

export const PremiumIconWrapper = styled.View`
  width: 50;
  height: 50;
  border-radius: 25;
  background-color: ${colors.amber};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
`

export const PremiumText = styled.Text`
  font-size: 26;
  color: #fff;
  text-align: center;
`

export const WhiteLine = styled.View`
  border: solid 0 #fff;
  border-bottom-width: 1;
  width: 100%;
  margin-bottom: 20;
  margin-top: 20;
`

export const WhiteText = styled.Text`
  font-size: 20;
  padding-left: 10;
  padding-right: 10;
  color: #fff;
  font-weight: bold;
`

export const styles = {
  Button: {
    fieldStyle: {
      width: '90%',
      alignSelf: 'center',
    },
    disabledGradient: {
      start: colors.addServiceBtn.end,
      end: colors.addServiceBtn.start,
    },
  },
}

export const PayPalIcon = styled(FaIcon).attrs(() => ({
  name: 'paypal',
  size: 20,
  color: '#fff',
}))`
  align-self: center;
`
