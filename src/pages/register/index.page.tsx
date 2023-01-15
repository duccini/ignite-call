import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormError, Header, RegisterContainer } from './styles'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter pelo menos 3 caracteres' })
    .max(15, { message: 'O usuário deve ter no máximo 15 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve ter apenas letras e hifen',
    }),
  name: z
    .string()
    .min(5, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .max(40, { message: 'O nome deve ter no máximo 40 caracteres' }),
})

type RegisterData = z.infer<typeof registerSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterData) {
    try {
      await api.post('users', {
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
      }
      console.log(error)
    }
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading as="strong">Bem vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar o seu perfil! Ah, você
          pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="md">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="md">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </RegisterContainer>
  )
}
