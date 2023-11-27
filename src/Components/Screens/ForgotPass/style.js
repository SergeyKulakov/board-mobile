import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`

export const Header = styled.View`
  flex-direction: row;
  padding-left: 10;
  align-items: center;
  padding-bottom: 5;
  padding-top: 5;
`

export const Block = styled.View``

export const Middle = styled.View`
  margin-left: 20;
`

export const InputContainer = styled.View`
  margin-top: 20;
  height: 70;
  margin-bottom: 20;
`

export const Content = styled.View`
  padding-top: 5%;
  padding-left: 4%;
  padding-right: 4%;
  max-width: 500;
  width: 100%;
  margin: 0 auto;
`

export const styles = {
  Title: {
    fontSize: 18,
    textAlign: 'center',
  },
}
