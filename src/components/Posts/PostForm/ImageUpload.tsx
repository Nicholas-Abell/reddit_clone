import { Button } from '@chakra-ui/react';
import { Input } from 'postcss';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ setSelectedFile, onSelectedImage, setSelectedTab, selectedFile }) => {

    const selectedFileRef = useRef<HTMLInputElement>(null);

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='flex justify-center items-center py-20 border border-gray-200 w-full rounded-sm'>
                <Button onClick={() => selectedFileRef.current?.click()} variant='outline' height='28px'>Upload</Button>
                <input ref={selectedFileRef} onChange={() => { }} type='file' hidden />
            </div>
        </div>
    )
}
export default ImageUpload;