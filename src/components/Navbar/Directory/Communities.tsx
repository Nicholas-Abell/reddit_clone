import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { MenuItem } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {

};

const Communities: React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <CreateCommunityModal open={open} handleCLose={handleClose} />
            <MenuItem
                className='w-full hover:bg-gray-100'
                onClick={() => setOpen(true)}
            >
                <div className='flex items-center gap-2'>
                    <div>
                        <GrAdd size={20} />
                    </div>
                    Create Comunnity
                </div>
            </MenuItem>
        </>
    )
}
export default Communities;