import { Button } from '@chakra-ui/react';
import React from 'react';

const AuthButton: React.FC = () => {

    return (
        <>
            <Button variant='outline' className='h-[28px] w-[70px] md:w-[110px] mr-2' display={{ base: 'none', md: 'flex' }}>Login</Button>
            <Button className='h-[28px] w-[70px] md:w-[110px] mr-2' display={{ base: 'none', md: 'flex' }}>Sign Up</Button>
        </>
    )
}
export default AuthButton;