import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  width: 90;
  height: 90;
  border-radius: 50;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 10;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  background-color: ${colors.lightBlue};
`

export const styles = {
  IconCheck: {
    name: 'check',
    sie: 25,
    color: colors.white,
  },
  IconAvatar: {
    name: 'user',
    size: 45,
    color: colors.white,
  },
}

export const CheckContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 30;
  height: 30;
  border-radius: 20;
  background-color: ${colors.jade};
`

export const IconAvatarContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const ImageContainer = styled.View`
  flex: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50;
`
