import { Button, Image } from '@chakra-ui/react';
import React, { use } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <div className='flex flex-col w-full mb-4'>
            <Button
                variant='oauth'
                className='mb-1'
                isLoading={loading}
                onClick={() => signInWithGoogle()}
            >
                <Image src='/images/googlelogo.png' className='h-[20px]' />
                Continue with Google
            </Button>
            <Button variant='oauth'>Other</Button>
            {error && <p className='text-red-600'>{error.message}</p>}
        </div>
    )
}
export default OAuthButtons;