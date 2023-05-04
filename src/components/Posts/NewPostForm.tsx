import React, { use, useState } from 'react';

//icons
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';
import TabItem from './TabItem';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';

type NewPostFromProps = {};

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

const NewPostForm: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInput, setTextInput] = useState({
        title: '',
        body: '',
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState('');

    const handleCreatePost = async () => { };

    const onSelectImage = () => { };

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
                        <ImageUpload />
                    )
                }
            </div>
        </div>
    )
}
export default NewPostForm;