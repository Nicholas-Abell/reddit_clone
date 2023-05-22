import useDirectory from "@/src/hooks/useDirectory";
import { Icon, MenuItem } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageUrl?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageUrl,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageUrl })
      }
      className="w-full hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        {imageUrl ? (
          <img src={imageUrl} className="rounded-full w-4 mr-2" />
        ) : (
          <Icon as={icon} fontSize={20} color={iconColor} />
        )}
        <p>{displayText}</p>
      </div>
    </MenuItem>
  );
};
export default MenuListItem;
