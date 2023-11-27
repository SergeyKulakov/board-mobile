import styled from 'styled-components/native'

export const Container = styled.View`
  opacity: ${p => (p.visible ? 1 : 0)};
`
