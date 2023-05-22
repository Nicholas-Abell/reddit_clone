import { auth } from "@/src/firebase/clientApp";
import { Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <div className="flex items-center justify-center border border-green-400 bg-white h-[44px] px-6 oy-12">
      <div
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        className="flex justify-center items-center cursor-pointer"
      >
        <Image src="/images/redditface.svg" height="30px" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </div>
      {user && <Directory user={user} />}
      <SearchInput />
      <RightContent user={user} />
    </div>
  );
};
export default Navbar;
