import styled from 'styled-components/native'
import { space } from 'styled-system'

export const ListContainer = styled.View`
  flex-direction: column;
  align-items: center;
  ${space};
  padding-left: 15;
  padding-right: 15;
`

export const ListItemContainer = styled.View`
  margin-right: 6;
  margin-left: 6;
`

export const styles = {
  Title: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  ShadowBox: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 'auto',
  },
}
