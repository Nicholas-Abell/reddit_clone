import PageContent from '@/src/components/Layout/PageContent';
import NewPostForm from '@/src/components/Posts/NewPostForm';
import React from 'react';

type submitProps = {

};

const submit: React.FC<submitProps> = () => {

    return (
        <PageContent>
            <>
                <div className='w-full py-8 border-b border-b-white'>
                    <h1>Create a post</h1>
                </div>
                <NewPostForm />
            </>
            <>
                {/* <About /> */}
            </>
        </PageContent>
    )
}
export default submit;