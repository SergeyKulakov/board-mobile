import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  position: absolute;
  flex: 1;
  border-radius: 5;
  background-color: #fff;
  width: ${p => p.width};
`

export const Content = styled.View`
  padding-top: 10;
  ${space};
`

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
`

export const ButtonContainer = styled.View`
  flex: 1;
  margin-top: 20;
  width: 100%;
  margin-bottom: -2;
`

export const Title = styled.Text`
  flex: 1;
  width: 100%;
  font-size: 20;
  padding-top: 15;
  padding-bottom: 15;
  text-align: center;
  font-weight: bold;
  color: ${colors.black};
`
