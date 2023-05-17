import { Post } from '@/src/atoms/PostAtom';
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';

type CommentsProps = {
    user: User;
    selectedPost: Post | null;
    communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const onCreateComment = async (commentText: string) => {

    }

    const onDeleteComment = async (comment: any) => {

    }

    const getPostComments = async () => {

    }

    useEffect(() => {
        getPostComments();
    }, []);

    return (
        <div className='bg-white'>
            <div className='flex flex-col pr-4 pl-10 mb-6 w-full'>            
            <CommentInput
             commentText={commentText}
             setCommentText={setCommentText}
             user={user}
             createLoading={createLoading}
             onCreateComment={onCreateComment}
            />
            </div>
        </div>

    )
}
export default Comments;