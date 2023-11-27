import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space, flex, width } from 'styled-system'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.zircon};
`

export const Content = styled.View`
  padding-top: 20;
`

export const Block = styled.View`
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  ${flex};
  ${space};
  ${width};
`

export const ServicesListBlock = styled.View`
  margin-top: 10;
`

export const styles = {
  ShadowBox: {
    marginBottom: 0,
  },
  PeopleList: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
}
