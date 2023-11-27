import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.TouchableOpacity`
  overflow: hidden;
  border-radius: 15;
  margin-right: 5;
`

export const MoreImagesContaienr = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray04};
`

export const MoreImagesText = styled.Text`
  text-align: center;
  font-size: 25;
  color: ${colors.white};
  font-weight: bold;
`

export const styles = {
  getImageStyle: () => ({
    style: {
      width: metrics.widthPercentageToDP(29),
      height: metrics.widthPercentageToDP(29),
    },
  }),
}
