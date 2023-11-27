import styled from 'styled-components/native'
import { space, flex } from 'styled-system'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
  ${isIos() && 'margin-top: 10'};
  flex-direction: row;
  align-items: center;
  padding-top: 5;
  padding-bottom: 10;
`

export const Block = styled.View`
  flex: 1;
  align-items: center;
  ${space};
  ${flex};
`

export const BackIconWrapper = styled.View`
  margin-right: 15;
`

export const RightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
`

export const styles = {
  Title: {
    textAlign: 'center',
  },
}
