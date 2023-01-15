import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Hero, HomeContainer, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { ClainUsernameForm } from './components/ClainUsernameForm'

export default function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Heading>Agendamento descomplicado</Heading>

        <Text>
          Conect seu calendário e permita que as pessoas marquem agendamento no
          seu tempo livre
        </Text>

        <ClainUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="calendário simbolizando a aplicação em funcionamento"
        />
      </Preview>
    </HomeContainer>
  )
}
