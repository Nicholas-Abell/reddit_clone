import { firestore } from '@/src/firebase/clientApp';
import { GetServerSidePropsContext } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { Community } from '@/src/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    console.log('Community Data: ', communityData)

    return (
        <>
            <div>Welcome to {communityData?.id}</div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: JSON.parse(
                    safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
                ),
            },
        };
    } catch (error) {
        console.log('getServerSideProps error', error)
    }
}
export default CommunityPage