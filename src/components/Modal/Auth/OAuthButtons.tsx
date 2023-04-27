import { Button, Image } from '@chakra-ui/react';
import React from 'react';

const OAuthButtons: React.FC = () => {

    return (
        <div className='flex flex-col w-full mb-4'>
            <Button variant='oauth' className='mb-1'>
                <Image src='/images/googlelogo.png' className='h-[20px]' />
                Continue with Google
            </Button>
            <Button variant='oauth'>Other</Button>
        </div>
    )
}
export default OAuthButtons;