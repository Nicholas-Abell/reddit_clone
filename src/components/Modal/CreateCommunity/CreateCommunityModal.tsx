import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react';

//icons
import { BsPersonFill, BsFillEyeFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi'

type CreateCommunityModalProps = {
    open: boolean;
    handleCLose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleCLose }) => {
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState('public')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    }

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    }

    return (
        <Modal isOpen={open} onClose={handleCLose} size='xl'>
            <ModalOverlay />
            <ModalContent className='px-2'>
                <ModalHeader className='text-sm'>Create a Community</ModalHeader>
                <ModalCloseButton />
                <ModalBody className='flex flex-col px-2'>
                    <h2 className='font-bold'>Name</h2>
                    <p className='text-xs text-gray-400'>Communities name including capitilization can not be changed</p>
                    <div className='flex items-center gap-2 mt-6'>
                        <h2>r/</h2>
                        <Input onChange={handleChange} max={21} value={communityName} />
                    </div>
                    <p className={charsRemaining === 0 ? 'text-xs text-red-600' : 'text-xs'}>{charsRemaining} characters remaining</p>
                    <h2 className='font-bold my-4'>Community Type</h2>
                    <div className='flex flex-col justify-around gap-4'>
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                name='public'
                                isChecked={communityType === 'public'}
                                onChange={onCommunityTypeChange}

                            >
                                <div className='flex items-center gap-2'>
                                    <BsPersonFill className='text-gray-400' />
                                    Public
                                </div>
                            </Checkbox>
                            <p className={communityType !== 'public' ? 'hidden' : 'text-xs text-gray-400'}>Anyone can view, post, and comment</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                name='restricted'
                                isChecked={communityType === 'restricted'}
                                onChange={onCommunityTypeChange}
                            >
                                <div className='flex items-center gap-2'>
                                    <BsFillEyeFill className='text-gray-400' />
                                    Restricted
                                </div>
                            </Checkbox>
                            <p className={communityType !== 'restricted' ? 'hidden' : ' text-xs text-gray-400'}>Anyone can view this community, but only approved members can post</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                name='private'
                                isChecked={communityType === 'private'}
                                onChange={onCommunityTypeChange}
                            >
                                <div className='flex items-center gap-2'>
                                    <HiLockClosed className='text-gray-400' />
                                    Private
                                </div>
                            </Checkbox>
                            <p className={communityType !== 'private' ? 'hidden' : ' text-xs text-gray-400'}>Only approved user can view and submit to this community</p>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className='bg-gray-100' borderRadius='0px 0px 10px 10px' >
                    <Button variant={'outline'} height={'30px'} onClick={handleCLose} colorScheme='blue' mr={3}>
                        Cancel
                    </Button>
                    <Button height={'30px'} onClick={() => { }}>Create Community</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}
export default CreateCommunityModal;