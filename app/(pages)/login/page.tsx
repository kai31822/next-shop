import React from 'react'
import Container from '@/app/components/ui/Container'
import FormWrap from '@/app/components/ui/FormWrap'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Loginpage = async () => {
  //
  const currentUser = await getCurrentUser()
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  )
}

export default Loginpage
