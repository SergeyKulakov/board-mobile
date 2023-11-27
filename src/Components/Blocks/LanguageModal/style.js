import styled from 'styled-components/native'
import { metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  max-height: ${p =>
    p.isHorizontal
      ? metrics.screenWidth - 200
      : metrics.heightPercentageToDP(50)};
`
