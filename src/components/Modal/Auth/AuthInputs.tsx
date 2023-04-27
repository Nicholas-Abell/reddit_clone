import { authModalState } from '@/src/atoms/authModalAtom';
import React from 'react';
import { useRecoilValue } from 'recoil'
import Login from './Login';
import SignUp from './SignUp';

type AuthInputsProps = {

};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState)

    return (
        <div className='flex flex-col justify-center items-center w-full mt-4'>
            {modalState.view === 'login' && <Login />}
            {modalState.view === 'signup' && <SignUp />}
        </div>
    )
}
export default AuthInputs;