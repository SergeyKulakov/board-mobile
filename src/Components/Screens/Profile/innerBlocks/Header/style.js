import styled from 'styled-components/native'
import { flex } from 'styled-system'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-right: 5;
`

export const Block = styled.View`
  flex: 1;
  ${flex};
  align-items: center;
  flex-direction: row;
`

export const LanguageButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

export const Left = styled.View`
  min-width: 25;
  flex-direction: row;
  align-items: center;
`

export const styles = {
  Icon: {
    name: 'angle-left',
    size: 40,
    color: colors.white,
  },
  Title: {
    paddingTop: 3,
    fontSize: 25,
  },
}
