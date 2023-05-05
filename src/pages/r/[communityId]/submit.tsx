import PageContent from '@/src/components/Layout/PageContent';
import NewPostForm from '@/src/components/Posts/NewPostForm';
import { auth } from '@/src/firebase/clientApp';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type submitProps = {

};

const submit: React.FC<submitProps> = () => {

    const [user] = useAuthState(auth);

    return (
        <PageContent>
            <>
                <div className='w-full py-8 border-b border-b-white'>
                    <h1>Create a post</h1>
                </div>
                {user && <NewPostForm user={user} />}
            </>
            <>
                {/* <About /> */}
            </>
        </PageContent>
    )
}
export default submit;