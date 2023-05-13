import React, { useRef, useState } from 'react';
import { Community, communityState } from '../../atoms/communitiesAtom';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { Divider, Input, Spinner } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '@/src/firebase/clientApp';
import useSelectFile from '@/src/hooks/useSelectFile';
import { FaReddit } from 'react-icons/fa';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

type AboutProps = {
    communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null);
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);
    const setCommunityStateValue = useSetRecoilState(communityState);

    const onUpdateImage = async () => {
        if (!selectedFile) return;
        setUploadingImage(true);
        try {
            const imageRef = ref(storage, `communities/${communityData.id}/image`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, 'communities', communityData.id), {
                imageURL: downloadURL,
            });
            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                } as Community,
            }));
            setUploadingImage(false)
        } catch (error) {
            console.log('onUpdateImage Error: ', error)
        }
    }

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
                {user?.uid === communityData.creatorId && (
                    <>
                        <Divider />
                        <div className='flex flex-col pt-4'>
                            <h2>Admin</h2>
                            <div className='flex items-center justify-between'>
                                <p
                                    onClick={() => selectedFileRef.current?.click()}
                                    className='text-blue-500 cursor-pointer hover:underline'
                                >
                                    Change Image
                                </p>
                                {communityData.imageURL || selectedFile
                                    ? (
                                        <img
                                            className='rounded-full max-w-[80px]'
                                            alt='Community Image'
                                            src={selectedFile || communityData.imageURL}
                                        />
                                    )
                                    : (<FaReddit size={65} className='relative top-[-12px] border-4 border-white rounded-full text-blue-400' />)
                                }
                            </div>
                            {selectedFile && (
                                (uploadingImage
                                    ? (<Spinner />)
                                    : (
                                        <p onClick={onUpdateImage}>
                                            Save Changes
                                        </p>
                                    )
                                )
                            )}
                            <Input
                                hidden
                                id='file-upload'
                                type='file'
                                accept='image/x-png,image/gif,image/jpeg'
                                ref={selectedFileRef}
                                onChange={onSelectFile}
                            />
                        </div>
                    </>
                )}

            </div>
        </div>

    )
}
export default About;