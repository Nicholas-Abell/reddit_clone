import React from "react";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className="flex justify-center px-4 pt-4">
      <div className="flex w-[95%] max-w-[860px]">
        {/* LeftHand Side */}
        <div className="flex flex-col w-full md:w-[65%] md:mr-6">
          {children && children[0 as keyof typeof children]}
        </div>
        {/* RightHand Side */}
        <div className="hidden md:flex flex-col flex-grow">
          {children && children[1 as keyof typeof children]}
        </div>
      </div>
    </div>
  );
};
export default PageContent;
