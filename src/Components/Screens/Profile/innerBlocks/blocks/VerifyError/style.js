import styled from 'styled-components/native/dist/styled-components.native.esm'
import colors from 'Themes/Colors'

export const Container = styled.View`
  flex-direction: row;
  margin-top: 5;
  align-items: center;
  justify-content: space-between;
`

export const Text = styled.Text`
  font-size: 14;
  color: ${colors.red};
`

export const Link = styled(Text)``

export const styles = {
  Loader: {
    size: 'small',
    color: colors.blue,
  },
}
