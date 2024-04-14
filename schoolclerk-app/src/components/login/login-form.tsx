'use client'
import {SubmitHandler, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import { fetcher } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';
import { saveTokenToCookie } from '@/lib/saveTokenToCookie';
import { useRouter } from 'next/navigation';

const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface IFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });
    const {data: loginData, trigger, error, isMutating} = useSWRMutation<{token: string}>('/auth/login', fetcher)
    const router = useRouter()

    const onSubmit: SubmitHandler<IFormData> = data => {
        console.log(data);
        // Handle form submission
        trigger({ body: data, method: 'POST'} as any).then(async (value) => {
            await saveTokenToCookie(value?.token)
            router.push('/')
        })

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Label htmlFor="email" >Email</Label>
                <Input type="email" id="email" {...register('email')} className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
            </div>

            <div>
                <Label htmlFor="password" >Password</Label>
                <input type="password" id="password" {...register('password')} className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                <p className="mt-2 text-sm text-red-600">{errors.password?.message}</p>
            </div>

            <div>
                <Button type="submit" className="w-full flex justify-center">{isMutating ? 'Logging in...' : 'Login'}</Button>
            </div>
        </form>
    );
};

export default LoginForm;
