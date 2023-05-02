import React from 'react';

type PageContentProps = {
    children: any
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {

    return (
        <div className='flex justify-center px-4'>
            <div className='flex w-[95%] max-w-[860px]'>
                {/* LeftHand Side */}
                <div className='flex flex-col w-full md:w-[65%] border-2 border-blue-300'>
                    {children && children[0 as keyof typeof children]}
                </div>
                {/* RightHand Side */}
                <div className='hidden sm:flex flex-col flex-grow md border-2 border-orange-300'>
                    {children && children[1 as keyof typeof children]}
                </div>
            </div>
        </div>
    )
}
export default PageContent;