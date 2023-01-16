import { Box, styled, Text } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '3px solid $ignite300',
  borderRadius: '$md',
  padding: '$4 $6',
  marginBottom: '$4',
})

export const AuthError = styled(Text, {
  marginBottom: '$4',
  color: '#f5a68',
})
