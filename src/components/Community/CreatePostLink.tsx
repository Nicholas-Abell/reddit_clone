import { useRouter } from "next/router";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";

const CreatePostLink: React.FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

    const onClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }
        router.push(`/r/${router.query.community}/submit`); // returning undefined
    };

    return (
        <div className="flex justify-evenly items-center bg-white h-[56px] rounded border border-gray-300 p-2 mb-4">
            <FaReddit size={50} className="mr-4 text-gray-300" />
            <input
                onClick={onClick}
                type="text"
                placeholder="Create Post"
                className="text-sm bg-gray-50 border py-[7px] w-full rounded
                 placeholder:text-gray-500 mr-4 placeholder:p-4 hover:bg-white 
                 hover:border-blue-500 focus:outline-none focus:bg-white
                 focus:border-blue-500"
            />
            <IoImageOutline
                size={34}
                className="mr-4 text-gray-400 cursor-pointer"
            />
            <BsLink45Deg
                size={34}
                className="text-gray-400 cursor-pointer"
            />
        </div>

    );
};
export default CreatePostLink;