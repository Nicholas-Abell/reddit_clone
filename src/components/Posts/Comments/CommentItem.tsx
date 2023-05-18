import { Timestamp } from 'firebase/firestore';
import React from 'react';

export type Comment = {
    id: string;
    creatorId: string;
    creatorDisplayText: string;
    communityId: string;
    postId: string;
    postTitle: string;
    text: string;
    createdAt: Timestamp;
}

const CommentItem:React.FC<Comment> = () => {
    
    return <div>Have a good coding</div>
}
export default CommentItem;