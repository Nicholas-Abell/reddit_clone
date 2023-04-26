import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import AuthButton from './RightContent/AuthButton';

const Navbar: React.FC = () => {

    return (
        <div className='flex items-center justify-center border border-green-400 bg-white h-[44px] px-6 oy-12'>
            <div className='flex justify-center items-center'>
                <Image src='/images/redditface.svg' height='30px' />
                <Image src='/images/redditText.svg' height='46px' display={{ base: 'none', md: 'unset' }} />
            </div>
            <SearchInput />
            <AuthButton />
        </div>
    )
}
export default Navbar;