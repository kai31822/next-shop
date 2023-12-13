import React from 'react'
import Container from '@/app/components/ui/Container'
import FormWrap from '@/app/components/ui/FormWrap'
import LoginForm from './LoginForm'

const Loginpage = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm/>
      </FormWrap>
    </Container>
  )
}

export default Loginpage
