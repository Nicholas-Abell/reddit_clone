import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateCommunityModal open={open} handleCLose={handleClose} />
      <div className="mt-3 mb-4">
        <p className="font-semibold text-gray-500 pl-3">MY COMMUNITIES</p>
        <MenuItem
          className="w-full hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <div>
              <GrAdd size={20} />
            </div>
            Create Community
          </div>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <>
            <div key={snippet.communityId}>{snippet.communityId}</div>
          </>
        ))}
      </div>
    </>
  );
};
export default Communities;
