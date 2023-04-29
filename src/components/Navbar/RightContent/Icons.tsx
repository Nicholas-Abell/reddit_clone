import { Icon } from '@chakra-ui/react';
import React from 'react';
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOffOutline,
    IoVideocamOutline,
} from "react-icons/io5";

const Icons: React.FC = () => {

    return (
        <div className='flex justify-center items-center'>
            <div className='hidden md:flex justify-center border-r-2 border-gray-200'>
                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <BsArrowUpRightCircle size={22} />
                </div>
                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <IoFilterCircleOutline size={25} />
                </div>
                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <IoVideocamOffOutline size={25} />
                </div>
            </div>
            <>
                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <BsChatDots size={22} />
                </div>
                <div className='flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <IoNotificationsOutline size={22} />
                </div>
                <div className='hidden md:flex mx-[0.5px] p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                    <GrAdd size={22} />
                </div>
            </>
        </div>
    )
}
export default Icons;