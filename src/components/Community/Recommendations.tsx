import React, { useEffect, useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import UseCommunityData from "@/src/hooks/useCommunityData";
import { firestore } from "@/src/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { Button, Icon, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoaing] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = UseCommunityData();

  const getCommunityRecommendations = async () => {
    setLoaing(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations Error: ", error);
    }
    setLoaing(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-sm border border-red-300">
      <div className="flex relative items-end h-[70px] text-white rounded-t-md font-bold bg-[url(/images/recCommsArt.png)] bg-cover">
        <div className="w-full h-full bg-gradient-to-t from-black/80 absolute " />
        <p className="z-10 p-2">Top Communiites</p>
      </div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {communities.map((community, index) => {
            const isJoined = communityStateValue.mySnippets.find(
              (snippet) => snippet.communityId === community.id
            );
            return (
              <Link key={community.id} href={`/r/${community.id}`}>
                <div className="flex relative items-center py-2 px-3 border-b border-b-gray-200 text-sm">
                  <div className="flex items-center w-[80%]">
                    <div className="flex w-[15%]">
                      <p>{index + 1}</p>
                    </div>
                    <div className="flex items-center w-[80%]">
                      {community.imageURL ? (
                        <Image
                          src={community.imageURL}
                          borderRadius="full"
                          boxSize="28px"
                          mr={2}
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={30}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >{`r/${community.id}`}</span>
                    </div>
                  </div>
                  <div className="absolut right-2">
                    <Button
                      height="22px"
                      fontSize="8pt"
                      variant={isJoined ? "outline" : "solid"}
                      onClick={(event) => {
                        event.stopPropagation();
                        onJoinOrLeaveCommunity(community, !isJoined);
                      }}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};
export default Recommendations;
