import { Spinner } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <div className="flex flex-col pl-10">
      <div>
        <FaReddit className="text-gray-300" size={25} />
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">{comment.creatorDisplayText}</p>
        <p className="text-gray-300">
          {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
        </p>
      </div>
      {loadingDelete && <Spinner size="sm" />}
      <p>{comment.text}</p>
      <div className="flex items-center cursor-pointer text-gray-500 p-2 gap-4">
        <IoArrowUpCircleOutline size={25} />
        <IoArrowDownCircleOutline size={25} />
        {userId === comment.creatorId && (
          <>
            <p className="text-blue-400">Edit</p>
            <p
              className="text-blue-400"
              onClick={() => onDeleteComment(comment)}
            >
              Delete
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default CommentItem;
