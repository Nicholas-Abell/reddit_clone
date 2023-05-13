import React from "react";
import { useRecoilState } from "recoil";
import { Post, PostVote, postState } from "../atoms/PostAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async (post: Post, vote: number, communityId: string) => {
        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            const udatedPosts = { ...postStateValue.posts };
            const updatedPostVotes = { ...postStateValue.postVotes };
            const voteChange = vote;

            //new vote
            if (!existingVote) {
                const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote,
                };
                batch.set(postVoteRef, newVote);
            };


            // setPostStateValue(prev => ({
            //     ...prev,
            //     posts: updatedPosts,
            //     postVotes: 
            // }))

        } catch (error) {
            console.log('OnVote Error: ', error);
        }
    };

    const onSelectPost = () => { };

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            //check for image
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            //delete post
            const postDocRef = doc(firestore, 'posts', post.id!);
            await deleteDoc(postDocRef);
            //update recoil state
            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id),
            }))
        } catch (error) {

        }
        return true
    };

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    };
};

export default usePosts;