import { Community } from '@/src/atoms/communitiesAtom';
import { Button, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

//icons
import { FaReddit } from 'react-icons/fa'; 'react-icons/fa'

type HeaderProps = {
    communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    //fix icon gap
    const [isJoined, setIsJoined] = useState(false);

    return (
        <div className='flex flex-col w-full h-[146px]'>
            <div className='w-full h-[120px] bg-blue-400' />
            <div className='flex flex-grow justify-center bg-white'>
                <div className='flex w-[95%] max-w-[860px]'>
                    {
                        communityData.imageURL
                            ? (
                                <Image />
                            )
                            : (
                                <FaReddit size={65}
                                    className='relative top-[-12px] border-4 
                                border-white rounded-full text-blue-400'
                                />
                            )
                    }
                    <div className='flex px-2 py-4'>
                        <div className='flex flex-col mr-6'>
                            <h2 className='font-extrabold text-lg'>{communityData.id}</h2>
                            <p className='text-sm text-gray-400 font-bold'>r/{communityData.id}</p>
                        </div>
                        <Button
                            variant={isJoined ? 'outline' : 'solid'}
                            height={'30px'}
                            px={'6'}
                            onClick={() => { }}
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Header;