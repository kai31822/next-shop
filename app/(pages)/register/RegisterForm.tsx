'use client'
import Input from '@/app/components/ui/Inputs/Input'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import Link from 'next/link'
import React, { useState } from 'react'
import { RegisterOptions, FieldValues, UseFormRegisterReturn, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    //
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
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
            <Heading title='Create your account!'></Heading>
            {/* sing up whit google */}
            <Button outline label='Sign up with Google' icon={AiOutlineGoogle} onClick={() => { }}></Button>
            <hr className='bg-slate-300 w-full h-px' />
            {/* name */}
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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
            <Button label={isLoading ? 'Loading' : 'Sing Up'} onClick={handleSubmit(onSubmit)}></Button>
            <p className='text-sm'>Already have an account? <Link className='underline' href='/login'>Log in</Link></p>
        </>
    )
}

export default RegisterForm
