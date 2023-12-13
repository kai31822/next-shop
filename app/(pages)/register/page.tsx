import Container from '@/app/components/ui/Container'
import FormWrap from '@/app/components/ui/FormWrap'
import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm></RegisterForm>
            </FormWrap>
        </Container>
    )
}

export default RegisterPage
