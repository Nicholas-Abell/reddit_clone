import { Button } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {
    textInput: {
        title: string;
        body: string;
    }
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const TextInput: React.FC<TextInputProps> = ({ textInput, onChange, handleCreatePost, loading }) => {

    return (
        <div className='flex flex-col w-full justify-between p-4 gap-4'>
            <input
                name='title'
                value={textInput.title}
                onChange={onChange}
                placeholder='Title'
                className='border border-black p-4 bg-gray-100 outline-none rounded placeholder:text-gray-500' />
            <textarea
                name='body'
                value={textInput.body}
                onChange={onChange}
                className='border border-black p-4 bg-gray-100 outline-none rounded placeholder:text-gray-500'
                placeholder='Text (optional)'
            />

            <div className='flex'>
                <Button
                    padding='0px 30px'
                    disabled={!textInput.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </div>
        </div>
    )
}
export default TextInput;