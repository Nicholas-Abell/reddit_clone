import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const onSubmit = () => { };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                name='email'
                placeholder='email'
                type='email'
                className='mb-2'
                onChange={onChange}
            />
            <Input
                name='password'
                placeholder='password'
                type='password'
                onChange={onChange}
            />
            <Button className='w-full h-[36px] my-2'>Log In</Button>
        </form>
    )
}
export default Login;