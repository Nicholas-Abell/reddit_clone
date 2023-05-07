import { Post } from '@/src/atoms/postAtom';
import moment from 'moment';
import React from 'react';
import { IoArrowUpCircleSharp, IoArrowUpCircleOutline, IoArrowDownCircleSharp, IoArrowDownCircleOutline, IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import { BsChat } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';


type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue: number;
    onVote: () => {};
    onDeletePost: () => void;
    onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {

    return (
        <div
            onClick={() => { }}
            className='flex items-center gap-2 mb-2 bg-white border border-gray-300 rounded hover:border-gray-400'
        >
            <div className='flex flex-col h-full items-center bg-gray-200 rounded p-2'>
                {
                    userVoteValue === 1
                        ? (
                            <IoArrowUpCircleSharp
                                className='text-gray-400 cursor-pointer'
                                size={25}
                            />
                        )
                        : (
                            <IoArrowUpCircleOutline
                                className='text-gray-400 cursor-pointer'
                                size={25}
                            />
                        )
                }
                <p>{post.voteStatus}</p>
                {
                    userVoteValue === -1
                        ? (
                            <IoArrowDownCircleSharp
                                className='text-[#4379ff] cursor-pointer'
                                size={25}
                            />
                        )
                        : (
                            <IoArrowDownCircleOutline
                                className='text-gray-400 cursor-pointer'
                                size={25}
                            />
                        )
                }
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <p className='text-xs'>posted by u/{post.creatorDisplayName}{" "}{moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</p>
                    </div>
                    <h2 className='font-bold'>{post.title}</h2>
                    <p className='text-sm'>{post.body}</p>
                    {
                        post.imageURL && (
                            <div className='flex justify-center items-center p-2 max-h-full'>
                                <img src={post.imageURL} alt='Post Image' />
                            </div>
                        )
                    }
                </div>
                <div className='flex ml-1 mb-0.5 text-gray-500 font-semibold'>
                    <div className='flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer'>
                        <BsChat size={19} />
                        <p>{post.numberOfComments}</p>
                    </div>
                    <div className='flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer'>
                        <IoArrowRedoOutline size={25} />
                        <p className='text-sm'>Share</p>
                    </div>
                    <div className='flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer'>
                        <IoBookmarkOutline size={20} />
                        <p className='text-sm'>Save</p>
                    </div>
                    <div className='flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer'>
                        <AiOutlineDelete size={20} />
                        <p className='text-sm'>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostItem;