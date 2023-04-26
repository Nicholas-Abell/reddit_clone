import { Button } from '@chakra-ui/react';
import React from 'react';

const AuthButton: React.FC = () => {

    return (
        <>
            <Button className='text-red-600'>Login</Button>
            <Button>Sign Up</Button>
        </>
    )
}
export default AuthButton;