import { Community } from '@/src/atoms/communitiesAtom';
import { Post } from '@/src/atoms/postAtom';
import { auth, firestore } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { it } from 'node:test';

type PostsProps = {
    communityData: Community;
    userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost
    } = usePosts();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const getPosts = async () => {
        try {
            //get posts for community
            const postQuery = query(
                collection(firestore, 'posts'),
                where('communityId', '==', communityData.id),
                orderBy('createdAt', 'desc'),
            );
            const postDocs = await getDocs(postQuery);

            //store in post state
            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }));

            console.log('posts: ', posts)
        } catch (error) {
            console.log('getPosts Error: ', error);
        }
    };

    useEffect(() => {
        getPosts();
    }, [])


    return (
        <>
            {
                postStateValue.posts.map((item) => (
                    <PostItem
                        post={item}
                        userIsCreator={user?.uid === item.creatorId}
                        userVoteValue={false}
                        onVote={onVote}
                        onSelectPost={onSelectPost}
                        onDeletePost={onDeletePost}
                    />
                ))
            }
        </>
    )
}
export default Posts;