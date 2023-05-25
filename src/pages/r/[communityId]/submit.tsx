import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import UseCommunityData from "../../../hooks/UseCommunityData";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = UseCommunityData();
  console.log("Community State: ", communityStateValue);

  return (
    <PageContent>
      <>
        <div className="w-full py-8 border-b border-b-white">
          <h1>Create a post</h1>
        </div>
        {user && (
          <NewPostForm
            user={user}
            communityImageUrl={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default submit;
