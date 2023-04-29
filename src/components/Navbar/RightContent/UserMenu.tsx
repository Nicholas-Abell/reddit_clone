import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { User, signOut } from 'firebase/auth';
import React from 'react';

//icons
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/src/firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';

type UserMenuProps = {
    user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <Menu>
            <MenuButton className='cursor-pointer py-[6px] rounded-lg hover:outline-1 outline-gray-200'>
                {
                    user
                        ? (
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200 text-gray-300'>
                                    <FaRedditSquare size={30} />
                                </div>
                                <div className='flex flex-col justify-left items-start mr-4'>
                                    <p className='text-gray-400 text-sm'>
                                        {user?.displayName || user?.email?.split('@')[0]}
                                    </p>
                                    <div className='hidden md:flex gap-2 items-center cursor-pointer text-gray-300'>
                                        <IoSparkles className='text-red-600' size={10} />
                                        <p className='text-sm'>Karma</p>
                                    </div>
                                </div>
                                <ChevronDownIcon />
                            </div>
                        )
                        : (
                            <>
                                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200 text-gray-300'>
                                    <VscAccount size={25} />
                                </div>
                            </>
                        )
                }
            </MenuButton>
            <MenuList>
                {
                    user
                        ? (
                            <>
                                <MenuItem>
                                    <div className='flex items-center justify-center font-bold mx-[0.5px] p-2 cursor-pointer rounded-lg'>
                                        <CgProfile size={25} className='mr-4' />
                                        Profile
                                    </div>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => signOut(auth)}>
                                    <div className='flex items-center justify-center font-bold mx-[0.5px] p-2 cursor-pointer rounded-lg'>
                                        <MdOutlineLogin size={25} className='mr-4' />
                                        Log Out
                                    </div>
                                </MenuItem>
                            </>
                        )
                        : (
                            <>
                                <MenuItem onClick={() => setAuthModalState({ open: true, view: 'login' })}>
                                    <div className='flex items-center justify-center font-bold mx-[0.5px] p-2 cursor-pointer rounded-lg'>
                                        <MdOutlineLogin size={25} className='mr-4' />
                                        Log in / Sign Up
                                    </div>
                                </MenuItem>
                            </>
                        )
                }

            </MenuList>
        </Menu >
    )
}
export default UserMenu;