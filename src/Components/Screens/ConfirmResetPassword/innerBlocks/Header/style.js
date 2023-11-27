import styled from 'styled-components/native'
import { ScreenTitle } from 'Components/UI'

export const Block = styled.View`
  margin-right: 15;
`

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 2%;
`

export const Middle = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Title = styled(ScreenTitle)`
  text-align: center;
  font-size: 18;
`

export const styles = {
  Title: {
    fontSize: 22,
    textAlign: 'center',
  },
}
