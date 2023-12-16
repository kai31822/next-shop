'use client'
import Input from '@/app/components/ui/Inputs/Input'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RegisterOptions, FieldValues, UseFormRegisterReturn, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { safeUser } from '@/lib/types'

//
interface LoginFormProps {
    currentUser: safeUser | null
}
//

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
    const router = useRouter()
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
    //
    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh()
        }
    }, [])
    //submit
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        // console.log(data);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                router.push('/')
                router.refresh
                toast.success('Logged In')
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
            .finally(() => { setIsLoading(false) })
    }
    //
    if (currentUser) {
        return <p className='text-center'>Logged in. Redirecting...</p>
    }

    return (
        <>
            <Heading title='Sign in to shop!'></Heading>
            {/* sing up whit google */}
            <Button outline label='Continue with Google' icon={AiOutlineGoogle} onClick={() => {signIn('google') }}></Button>
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
