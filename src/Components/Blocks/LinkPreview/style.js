import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Icon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: column;
  margin-top: 20;
`

export const PlusIcon = styled(Icon).attrs({
  name: 'plus',
  size: 35,
  color: colors.blue,
  type: 'ant',
})``

export const ItemContainer = styled.View`
  flex-direction: column;
  padding-bottom: 5;
`

export const AddButton = styled.View`
  background-color: ${colors.zumthor};
  justify-content: center;
  align-items: center;
  width: 100;
  height: 100;
  border-radius: 5;
  margin-right: 20;
  margin-top: 10;
  margin-bottom: 10;
`

export const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Loader = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: colors.blue,
}))``

export const styles = {
  ActivityIndicator: {
    size: 'large',
    color: colors.blue,
  },
}
