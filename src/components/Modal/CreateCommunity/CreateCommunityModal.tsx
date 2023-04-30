import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type CreateCommunityModalProps = {
    open: boolean;
    handleCLose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleCLose }) => {
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    }

    return (
        <Modal isOpen={open} onClose={handleCLose}>
            <ModalOverlay />
            <ModalContent className='px-2'>
                <ModalHeader className='text-sm'>Create a Community</ModalHeader>
                <ModalCloseButton />
                <ModalBody className='flex flex-col px-2'>
                    <h2 className='font-bold'>Name</h2>
                    <p className='text-xs text-gray-400'>Communities name including capitilization can not be changed</p>
                    <div className='flex items-center gap-2 mt-6'>
                        <h2>r/</h2>
                        <Input onChange={handleChange} />
                    </div>
                    <p className={charsRemaining < 0 ? 'text-sm text-red-600' : 'text-xs'}>{charsRemaining} characters remaining</p>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={handleCLose} colorScheme='blue' mr={3}>
                        Close
                    </Button>
                    <Button variant='ghost'>Create Community</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default CreateCommunityModal;