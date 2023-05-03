import React from 'react';
import { TabItems } from './NewPostForm';
import { Icon } from '@chakra-ui/react';

type TabItemProps = {
    item: TabItems;
    selected: boolean;
    setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ item, selected, setSelectedTab }) => {

    return (
        <div
            onClick={() => setSelectedTab(item.title)}
            className={selected ? 'flex justify-center flex-grow px-3.5 cursor-pointer font-bold hover:bg-gray-50 text-blue-500 border-r border-r-gray-200 border-b border-b-blue-500 py-4' : 'flex justify-center flex-grow px-3.5 cursor-pointer hover:bg-gray-50 border-r-gray-200 border-r border-b border-b-gray-200 text-gray-400 py-4'}>
            <div className='flex items-center h-[20px]'>
                <Icon as={item.icon} />
            </div>
            <p>{item.title}</p>
        </div>
    )
}
export default TabItem;