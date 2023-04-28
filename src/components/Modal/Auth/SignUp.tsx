import { authModalState } from '../../../atoms/authModalAtom';
import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('')
    const [createUserWithEmailAndPassword, user, loading, userError,] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError('');
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder='email'
                type='email'
                className='mb-2 text-sm placeholder:text-gray-500 bg-white border border-blue-500 focus:outline-none focus:bg-gray-200'
                onChange={onChange}
            />
            <Input
                required
                name='password'
                placeholder='password'
                type='password'
                className='mb-2 text-sm placeholder:text-gray-500 bg-white border border-blue-500 focus:outline-none focus:bg-gray-200'

                onChange={onChange}
            />
            <Input
                required
                name='confirmPassword'
                placeholder='confirm password'
                type='password'
                className='mb-2 text-sm placeholder:text-gray-500 bg-white border border-blue-500 focus:outline-none focus:bg-gray-200'

                onChange={onChange}
            />
            {
                (error || userError) && (
                    <p className='text-red-600 text'>
                        {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                    </p>
                )
            }
            <Button type='submit' isLoading={loading} className='w-full h-[36px] my-2'>Sign Up</Button>
            <div className='text-xs flex justify-center'>
                <p className='mr-1'>Already a redditor?</p>
                <p onClick={() =>
                    setAuthModalState((prev) => ({
                        ...prev,
                        view: 'login',
                    }))
                }
                    className='text-blue-500 font-bold cursor-pointer'
                >
                    LOG IN
                </p>
            </div>
        </form>
    )
}
export default SignUp;