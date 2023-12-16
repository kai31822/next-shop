'use client'
import Input from '@/app/components/ui/Inputs/Input'
import Button from '@/app/components/ui/product/Button'
import Heading from '@/app/components/ui/product/Heading'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RegisterOptions, FieldValues, UseFormRegisterReturn, useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { safeUser } from '@/lib/types'


//
interface RegisterFormProps {
    currentUser: safeUser | null
}
//
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
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
    const router = useRouter()
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
        console.log(data);
        axios.post('/api/register', data).then(() => {
            toast.success('Account created')
            setTimeout(
                (() => {
                    setIsLoading(false)
                    router.push('/')
                    router.refresh
                }), 3000)
        })
        //     //test
        //     signIn('credentials', {
        //         email: data.email,
        //         password: data.password,
        //         redirect: false
        //     }).then((callback) => {
        //         if (callback?.ok) {
        //             router.push('/cart')
        //             router.refresh
        //             toast.success('Logged In')
        //         }
        //         if (callback?.error) {
        //             toast.error(callback.error)
        //         }
        //     })
        //         //
        //         .catch(() => { toast.error("something went wrong ") })
        //         .finally(() => { setIsLoading(false) })

        }

        if (currentUser) {
            return <p className='text-center'>Logged in. Redirecting...</p>
        }

        return (
            <>
                <Heading title='Create your account!'></Heading>
                {/* sing up whit google */}
                <Button outline label='Continue with Google' icon={AiOutlineGoogle} onClick={() => { signIn('google') }}></Button>
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
