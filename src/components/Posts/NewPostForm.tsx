import React, { use, useState } from 'react';
import TabItem from './TabItem';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '../../atoms/PostAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Icon } from '@chakra-ui/react';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/src/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

//icons
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import useSelectFile from '@/src/hooks/useSelectFile';


type NewPostFromProps = {
    user: User;
};

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline,
    },
    {
        title: 'Link',
        icon: BsLink45Deg,
    },
    {
        title: 'Poll',
        icon: BiPoll,
    },
    {
        title: 'Talk',
        icon: BsMic,
    },
];

export type TabItems = {
    title: string;
    icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFromProps> = ({ user }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInput, setTextInput] = useState({
        title: '',
        body: '',
    });
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const handleCreatePost = async () => {
        const { communityId } = router.query; // error: undefined
        setLoading(true);

        const newPost: Post = {
            // id: nanoid(),
            communityId: communityId as string,
            creatorId: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInput.title,
            body: textInput.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        };

        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)
            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);

                await updateDoc(postDocRef, {
                    imageURL: downloadURL
                })
            }
            router.back();
        } catch (error: any) {
            setError(error);
            console.log('HandleCreatePost Error: ', error.message);
        }

        setLoading(false);
    };

    const onTextChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div className='flex flex-col bg-white rounded mt-2'>
            <div className='w-full flex'>
                {
                    formTabs.map((item) => {
                        return (
                            <TabItem
                                key={item.title} //add random key generator later
                                item={item}
                                selected={item.title === selectedTab}
                                setSelectedTab={setSelectedTab}
                            />
                        )
                    })
                }
            </div>
            <div className='flex'>
                {
                    selectedTab === 'Post' &&
                    (<TextInput
                        textInput={textInput}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={false} />)
                }
                {
                    selectedTab === 'Images & Video' && (
                        <ImageUpload
                            selectedFile={selectedFile}
                            onSelectedImage={onSelectFile}
                            setSelectedTab={setSelectedTab}
                            setSelectedFile={setSelectedFile}
                        />
                    )
                }
            </div>
            <p className='text-red-600 text-sm'>{error}</p>
        </div>
    )
}
export default NewPostForm;