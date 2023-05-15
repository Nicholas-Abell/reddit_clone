import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { auth, firestore } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authModalState } from '../atoms/authModalAtom';

const UseCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const setAuthModalState = useSetRecoilState(authModalState);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: Boolean) => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' })
            return;
        }

        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);

        try {
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );

            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
            console.log('My Snippets: ', snippets);

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as Array<CommunitySnippet>
            }))

        } catch (error: any) {
            console.log('getMySnippets error', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const joinCommunity = async (community: Community) => {
        try {
            const batch = writeBatch(firestore);

            //create new snippet for user
            const newSnippet: CommunitySnippet = {
                communityId: community.id,
                imageURL: community.imageURL || '',
            }
            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    community.id
                ),
                newSnippet
            );

            //update the number of members
            batch.update(doc(firestore, 'communities', community.id), {
                numberOfMembers: increment(1),
            })
            await batch.commit();
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))

        } catch (error: any) {
            console.log('joinCommunity Error: ', error.message);
            setError(error.message);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        setLoading(true);
        try {
            const batch = writeBatch(firestore);

            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));

            //update the number of members
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1),
            });

            await batch.commit();

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId),
            }));

        } catch (error: any) {
            console.group('leaveCommunity Error: ', error.message);
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        setCommunityStateValue((prev) => ({
            ...prev,
            mySnippets: [],
        }));
        return;
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default UseCommunityData;