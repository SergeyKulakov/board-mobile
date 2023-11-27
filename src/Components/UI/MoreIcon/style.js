import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: column;
`

export const Dot = styled.View`
  background-color: ${p => p.color};
  width: 4;
  height: 4;
  border-radius: 2;
  margin-bottom: 2;
`
