import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Post, PostVote, postState } from "../atoms/PostAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { communityState } from "../atoms/communitiesAtom";
import { authModalState } from "../atoms/authModalAtom";
import { useRouter } from "next/router";

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    const onVote = async (
        event: React.MouseEvent<SVGAElement, MouseEvent>,
        post: Post,
        vote: number,
        communityId: string
    ) => {
        event.stopPropagation();
        if (!user?.uid) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

            const batch = writeBatch(firestore);
            let updatedPost = { ...post };
            let updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            //new vote
            if (!existingVote) {
                const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote, // 1 or -1
                };

                console.log('New Vote');

                batch.set(postVoteRef, newVote);

                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote]
            }
            //Remove existing vote 
            else {
                const postVoteRef = doc(
                    firestore,
                    'users',
                    `${user?.uid}/postVotes/${existingVote.id}`
                );
                //Remove Vote
                if (existingVote.voteValue === vote) {
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter(
                        (vote) => vote.id !== existingVote.id
                    );

                    batch.delete(postVoteRef);

                    voteChange *= -1;
                }
                //Change Vote 
                else {
                    updatedPost.voteStatus = voteStatus + 2 * vote;

                    const voteIndex = postStateValue.postVotes.findIndex(
                        (vote) => vote.id === existingVote.id
                    );

                    updatedPostVotes[voteIndex] = {
                        ...existingVote,
                        voteValue: vote,
                    };

                    batch.update(postVoteRef, {
                        voteValue: vote
                    });

                    voteChange = 2 * vote;
                }
            }

            //update State
            const postIndex = postStateValue.posts.findIndex(item => item.id === post.id);
            updatedPosts[postIndex!] = updatedPost;
            setPostStateValue((prev) => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes
            }));

            if (postStateValue.selectedPost) {
                setPostStateValue((prev) => ({
                    ...prev,
                    selectedPost: updatedPost,
                }));
            }

            //update Firebase
            const postRef = doc(firestore, 'posts', post.id!);
            batch.update(postRef, { voteStatus: voteStatus + voteChange })

            await batch.commit();

        } catch (error) {
            console.log('OnVote Error: ', error);
        }
    };

    const onSelectPost = (post: Post) => {
        setPostStateValue(
            (prev) => ({
                ...prev,
                selectedPost: post,
            }));
        router.push(`/r/${post.communityId}/comments/${post.id}`);
    };

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
            }));

        } catch (error) {

        }
        return true
    };

    const getCommunityPostVotes = async (communityId: string) => {
        const postVotesQuery = query(
            collection(firestore, 'users', `${user?.uid}/postVotes`),
            where('communityId', '==', communityId)
        );

        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setPostStateValue(prev => ({
            ...prev,
            postVotes: postVotes as PostVote[],
        }))
    }

    useEffect(() => {
        if (!user || !currentCommunity?.id) return;
        getCommunityPostVotes(currentCommunity?.id)
    }, [user, currentCommunity]);

    useEffect(() => {
        if (!user) {
            //clear user post votes on logout
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: [],
            }));
        }
    }, [user])

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    };
};

export default usePosts;