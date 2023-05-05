import { Community } from '@/src/atoms/communitiesAtom';
import { firestore } from '@/src/firebase/clientApp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type PostsProps = {
    communityData: Community;
    userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
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

            console.log('posts: ', posts)
        } catch (error) {
            console.log('getPosts Error: ', error);
        }
    };

    useEffect(() => {
        getPosts();
    }, [])


    return (
        <></>
    )
}
export default Posts;