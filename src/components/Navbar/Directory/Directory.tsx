import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/src/hooks/useDirectory";

type DirectoryProps = {
  user?: User | null;
};

const Directory: React.FC<DirectoryProps> = ({ user }) => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        onClick={toggleMenuOpen}
        className="cursor-pointer py-[6px] rounded-lg hover:outline-1 outline-gray-200 mx-2"
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-2 cursor-pointer">
            {directoryState.selectedMenuItem.imageUrl ? (
              <Image
                src={directoryState.selectedMenuItem.imageUrl}
                className="rounded-full w-[24px]"
              />
            ) : (
              <TiHome size={25} />
            )}
            <p className="hidden md:block text-sm">
              {directoryState.selectedMenuItem.displayText}
            </p>
          </div>
          <ChevronDownIcon />
        </div>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
