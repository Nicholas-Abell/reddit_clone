import { Button, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, 'users', user.uid)
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    }

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred])

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