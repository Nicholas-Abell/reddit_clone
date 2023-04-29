import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { TiHome } from 'react-icons/ti';

type DirectoryProps = {
    user?: User | null;
};

const Directory: React.FC<DirectoryProps> = ({ user }) => {

    return (
        <Menu>
            <MenuButton className='cursor-pointer py-[6px] rounded-lg hover:outline-1 outline-gray-200 mx-2'>
                <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center gap-2 cursor-pointer'>
                        <TiHome size={25} />
                        <p className='hidden md:block'>Home</p>
                    </div>
                    <ChevronDownIcon />
                </div>
            </MenuButton>
            <MenuList>
                {/* <Communities /> */}
                <MenuItem>
                    Community
                </MenuItem>
            </MenuList>
        </Menu >
    )
}
export default Directory;