import { authModalState } from '@/src/atoms/authModalAtom';
import React from 'react';
import { useRecoilValue } from 'recoil'

type AuthInputsProps = {

};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState)

    return (
        <div className='flec flex-col justify-center items-center w-full mt-4'>
            {/* {modalState.view === 'login' && <Login />}
            {modalState.view === 'signup' && <SignUp />} */}
        </div>
    )
}
export default AuthInputs;