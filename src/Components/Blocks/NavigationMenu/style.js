import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Wrapper = styled.TouchableOpacity`
  flex-basis: 33%;
  margin-bottom: 15;
  justify-content: center;
  align-items: center;
`

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Item = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100;
  margin-top: 10;
  height: 110;
`

export const Text = styled.Text`
  font-size: 14;
  color: #000;
  text-align: center;
  padding-top: 10;
  flex: 2;
`

export const Circle = styled.View`
  position: absolute;
  top: -5;
  right: 30%;
  width: 10;
  height: 10;
  border-radius: 8;
  background-color: ${colors.red};
`

export const IconWrapper = styled.View`
  min-width: 40;
  min-height: 40;
  justify-content: center;
  align-items: center;
`
