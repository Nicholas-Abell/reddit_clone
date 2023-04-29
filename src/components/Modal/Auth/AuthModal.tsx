import {
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalCloseButton, ModalBody,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    }

    useEffect(() => {
        if (user) handleClose();
        console.log("user", user)
    }, [user])

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-center'>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='flex flex-col items-center justify-center mb-6'>
                        <div className='flex flex-col justify-center items-center w-[70%]'>
                            <OAuthButtons />
                            <p className='text-gray-500 font-bold'>OR</p>
                            <AuthInputs />
                            {/* <ResetPassword /> */}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal;