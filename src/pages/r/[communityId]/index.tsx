import { firestore } from '@/src/firebase/clientApp';
import { GetServerSidePropsContext } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { Community } from '@/src/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/src/components/Community/NotFound';
import Header from '@/src/components/Community/Header';
import PageContent from '@/src/components/Layout/PageContent';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    console.log('Community Data: ', communityData)

    if (!communityData) {
        return (
            <NotFound />
        )
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <div>Left</div>
                </>
                <>
                    <div>Right</div>
                </>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(
                        safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
                    )
                    : "",
            },
        };
    } catch (error) {
        console.log('getServerSideProps error', error)
    }
}
export default CommunityPage