import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding-top: 45;
  ${space};
  background-color: ${colors.frenchGray};
`

export const Text = styled.Text`
  font-size: 18;
  color: ${colors.white};
  padding-right: 2%;
`

export const TextBlock = styled.TouchableOpacity`
  align-self: center;
`

export const styles = {
  GooglePlacesAutocomplete: {
    textInputContainer: {
      width: '100%',
    },
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
  },
}
