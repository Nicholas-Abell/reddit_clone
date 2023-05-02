import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const UseCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: Boolean) => {
        //is user signed in
        //if not prompt auth modal
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData)
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

        } catch (error) {
            console.log('getMySnippets error', error);
        }
        setLoading(false);
    }

    const joinCommunity = (communityData: Community) => { };

    const leaveCommunity = (communityId: string) => { };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default UseCommunityData;