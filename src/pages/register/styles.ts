import { Heading, styled, Text, Box } from '@ignite-ui/react'

export const RegisterContainer = styled('div', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    fontSize: '$5xl',
    display: 'block',
    textAlign: 'center',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    margin: '$4 0 $6',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'grid',
  flexDirection: 'columns',
  gap: '$4',

  label: {
    display: 'grid',
    flexDirection: 'columns',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
