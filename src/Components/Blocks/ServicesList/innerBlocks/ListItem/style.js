import styled from 'styled-components/native'
import { colors } from 'Themes'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  margin-bottom: 10;
  margin-top: 10;
  max-width: 90;
`

export const Content = styled.View`
  height: 90;
  width: 90;
  border-radius: 15;
  border: solid 0 ${p => (p.isActive ? colors.blue : colors.disabledGray)};
  border-width: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  ${p => p.disabled && 'opacity: 0.4'};
`

export const Title = styled.Text`
  font-size: 12;
  color: ${p => (p.isActive ? colors.blue : colors.textGray)};
  text-align: center;
  ${isIos()
    ? null
    : `position: absolute;
       top: 0;
       width: 100%;
       left: 0;
      `};
`

export const ImageContainer = styled.View`
  width: 80%;
  height: 80%;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10;
  justify-content: center;
  position: relative;
  ${isIos() ? null : `height: 40;`};
`

export const FolderIconContainer = styled.View`
  justify-content: ${p => (p.isChanged ? 'space-between' : 'flex-end')};
  flex-direction: row;
  margin-top: -3;
  margin-right: -3;
  margin-left: -3;
`

export const styles = {
  Icon: {
    type: 'ant',
    name: 'edit',
    color: colors.red,
    size: 15,
  },
  FolderIcon: {
    name: 'folder-open-o',
    size: 15,
    color: colors.blue,
  },
}
