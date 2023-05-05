import { Post } from '@/src/atoms/postAtom';
import React from 'react';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue: boolean;
    onVote: () => {};
    onDeletePost: () => void;
    onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {

    return (
        <div className='bg-blue-300 w-[200px] h-[200px]'>
            <>{post.title}</>
        </div>
    )
}
export default PostItem;