import Container from '@/app/components/ui/Container'
import FormWrap from '@/app/components/ui/FormWrap'
import React from 'react'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const RegisterPage = async() => {
    const currentUser = await getCurrentUser()
    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser}></RegisterForm>
            </FormWrap>
        </Container>
    )
}

export default RegisterPage
