import { Button } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {

};

const TextInput: React.FC<TextInputProps> = () => {

    return (
        <div className='flex flex-col w-full justify-between p-4 gap-4'>
            <input
                name='title'
                onChange={() => { }}
                placeholder='Title'
                className='border border-black p-4 bg-gray-100 outline-none rounded placeholder:text-gray-500' />
            <textarea
                name='bdy'
                className='border border-black p-4 bg-gray-100 outline-none rounded placeholder:text-gray-500'
                placeholder='Text (optional)'
            />

            <div className='flex'>
                <Button>Post</Button>
            </div>
        </div>
    )
}
export default TextInput;