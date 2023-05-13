import React from 'react';
import { Community } from '../../atoms/communitiesAtom';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { Divider } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';

type AboutProps = {
    communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {

    return (
        <div className='sticky top-4'>
            <div className='flex justify-between items-center bg-blue-400 text-white rounded p-3'>
                <h2 className='font-bold text-sm'>About Community</h2>
                <HiOutlineDotsHorizontal size={25} />
            </div>
            <div className='flex flex-col p-3 bg-white rounded'>
                <div className='flex justify-between items-center w-full p-2 text-sm'>
                    <div className='flex flex-col font-bold'>
                        <p>{communityData.numberOfMembers.toLocaleString()}</p>
                        <p>Members</p>
                    </div>
                    <div className='flex flex-col font-bold'>
                        <p>1</p>
                        <p>Online</p>
                    </div>
                </div>
                <Divider />
                <div className='flex items-center w-full p-1 text-sm'>
                    <RiCakeLine size={20} className='mr-2' />
                    {communityData.createdAt && (
                        <p>Created {moment(new Date(communityData.createdAt.seconds * 1000)).format('MMM DD, YYYY')}</p>
                    )}
                </div>
                <Link href={`/r/${communityData.id}/submit`}>
                    <button className='w-full text-center bg-blue-400 rounded-full text-white mt-3'>
                        Create Post
                    </button>
                </Link>
            </div>
        </div>

    )
}
export default About;