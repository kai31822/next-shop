'use client'
import Input from '@/app/components/ui/Inputs/Input'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import Link from 'next/link'
import React, { useState } from 'react'
import { RegisterOptions, FieldValues, UseFormRegisterReturn, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

const LoginForm = ( ) => {
    const [isLoading, setIsLoading] = useState(false)
    //
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    //submit
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data);

    }

    return (
        <>
            <Heading title='Sign in to shop!'></Heading>
            {/* sing up whit google */}
            <Button outline label='Continue with Google' icon={AiOutlineGoogle} onClick={() => { }}></Button>
            <hr className='bg-slate-300 w-full h-px' />
            {/* email */}
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='email'
            />
            {/* password */}
            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='password'
            />
            {/*  */}
            <Button label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)}></Button>
            <p className='text-sm'>Do not have have an account? <Link className='underline' href='/register'>Sign up</Link></p>
        </>
    )
}

export default LoginForm
