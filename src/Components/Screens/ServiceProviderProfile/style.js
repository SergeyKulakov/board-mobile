import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space, minHeight } from 'styled-system'
import { LinkPreview as UILinkPreview } from 'Components/Blocks'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const HeaderProfileWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const ProfileName = styled.Text.attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  color: ${colors.white};
  font-size: 16;
  font-weight: bold;
  margin-right: 5;
  max-width: 30%;
`

export const Content = styled.ScrollView`
  flex: 1;
`

export const ProviderPhotoWrapper = styled.View`
  transform: scale(0.5);
`

export const Section = styled.View`
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 10;
  padding-top: 5;
  padding-bottom: 5;
  margin-left: 7;
  margin-right: 7;
  padding-right: 5;
  padding-left: 5;
  margin-bottom: 10;
  ${space};
  background-color: #fff;
  border-radius: 5;
  ${minHeight};
`

export const JobImagesWrapper = styled.View`
  margin-left: 7;
  margin-right: 7;
  margin-bottom: 10;
  min-height: 160;
`

export const SectionTitle = styled.Text`
  font-weight: bold;
  color: ${colors.black};
  font-size: 18;
  margin-top: 10;
  margin-bottom: 5;
  ${space};
`

export const ServicesWrapRowWrapper = styled.View`
  position: relative;
  padding-right: 60;
`

export const ChatWrapper = styled.View`
  position: absolute;
  bottom: 10;
  right: 0;
`

export const LinkPreview = styled(UILinkPreview)`
  margin-top: 5;
`

export const CrownIconWrapper = styled.View`
  margin-left: 5;
`

export default {
  ChatIcon: {
    type: 'ant',
    name: 'wechat',
    size: 40,
    color: colors.white,
  },
}
