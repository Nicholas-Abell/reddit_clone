import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom';

const AuthButton: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
            <Button
                variant='outline'
                className='h-[28px] w-[70px] md:w-[110px] mr-2'
                display={{ base: 'none', md: 'flex' }}
                onClick={() => setAuthModalState({ open: true, view: 'login' })}
            >
                Login
            </Button>
            <Button
                className='h-[28px] w-[70px] md:w-[110px] mr-2'
                display={{ base: 'none', md: 'flex' }}
                onClick={() => setAuthModalState({ open: true, view: 'signup' })}
            >
                Sign Up
            </Button>
        </>
    )
}
export default AuthButton;