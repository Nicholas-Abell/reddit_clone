import {
    Button, Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalCloseButton, ModalBody,
    ModalFooter, useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

type AuthModalProps = {

};

const AuthModal: React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    }
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col justify-center items-center w-[70%] border border-red-500'>
                            {/* <OAuthButtons /> */}
                            {/* <AuthInputs /> */}
                            {/* <ResetPassword /> */}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal;