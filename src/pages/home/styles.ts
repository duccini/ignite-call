import { styled, Heading, Text } from '@ignite-ui/react'

export const HomeContainer = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',

  marginLeft: 'auto',

  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    fontSize: '$6xl',

    '@media(max-width: 600px)': {
      fontSize: '$4xl',
    },
  },

  [`> ${Text}`]: {
    fontSize: '$lg',
    color: '$gray200',
    marginTop: '$2',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',
})
