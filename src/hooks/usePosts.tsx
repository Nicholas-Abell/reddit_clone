import React from "react";
import { useRecoilState } from "recoil";
import { Post, PostVote, postState } from "../atoms/PostAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

//TypeError: updatedPostVotes is not iterable

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async (post: Post, vote: number, communityId: string) => {
        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

            const batch = writeBatch(firestore);
            let updatedPost = { ...post };
            let updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            // if (!user?.uid) {
            //     setAuthModalState({ open: true, view: "login" });
            //     return;
            // }

            //new vote
            if (!existingVote) {
                const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote, // 1 or -1
                };
                batch.set(postVoteRef, newVote);

                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote]
            }
            //Remove existing vote 
            else {
                const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote.id}`);
                //Remove Vote
                if (existingVote.voteValue === vote) {
                    updatedPost.voteStatus === voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id);
                    batch.delete(postVoteRef);
                    voteChange *= -1;
                }
                //Change Vote 
                else {
                    updatedPost.voteStatus = voteStatus + 2 * vote;
                    const voteIndex = postStateValue.postVotes.findIndex(vote => vote.id === existingVote.id);
                    updatedPostVotes[voteIndex] = {
                        ...existingVote,
                        voteValue: vote,
                    };
                    batch.update(postVoteRef, {
                        posts: updatedPostVotes,
                        postVotes: updatedPostVotes
                    });

                    voteChange = 2 * vote;
                }
            }

            //update State
            const postIndex = postStateValue.posts.findIndex(item => item.id === post.id);
            updatedPosts[postIndex!] = updatedPost;
            setPostStateValue(prev => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes
            }));

            //update Firebase
            const postRef = doc(firestore, 'posts', post.id!);
            batch.update(postRef, { voteStatus: voteStatus + voteChange })

            await batch.commit();

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

    const getCommunityPostVotes = async (communityId: string) => {

    }

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    };
};

export default usePosts;