import { Button } from '@chakra-ui/react';
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
            {selectedFile
                ? (<>
                    <div className='flex flex-col py-4'>
                        <img src={selectedFile}
                            className='max-w-[400px] max-h-[400px]'
                        />
                        <div className='flex justify-center items-center mt-4 gap-4'>
                            <Button
                                height='28px'
                                onClick={() => setSelectedTab('Post')}
                            >
                                Back To Post
                            </Button>
                            <Button
                                height='28px'
                                onClick={() => setSelectedFile('')}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                </>
                )
                : (
                    <div className='flex justify-center items-center py-20 border border-gray-200 w-full rounded-sm'>
                        <Button onClick={() => selectedFileRef.current?.click()} variant='outline' height='28px'>Upload</Button>
                        <input ref={selectedFileRef} onChange={onSelectedImage} type='file' hidden />
                    </div >
                )
            }
        </div >
    )
}
export default ImageUpload;