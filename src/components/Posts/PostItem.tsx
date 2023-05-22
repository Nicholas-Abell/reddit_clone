import { Post } from "../../atoms/PostAtom";
import moment from "moment";
import React, { useState } from "react";
import {
  IoArrowUpCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowDownCircleOutline,
  IoArrowRedoOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Icon, Image, Skeleton, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<any, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost?: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImg] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");
  const [singlePostPage, setSinglePostPage] = useState(false);
  const router = useRouter();

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost!(post);

      if (!success) {
        throw new Error("failed to delete post");
      }

      console.log("Post Deleted");

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <div
      onClick={() => onSelectPost && onSelectPost(post)}
      className={`flex items-center gap-2 mb-2 bg-white border ${
        singlePostPage ? "border-white" : "border-gray-300"
      } rounded ${singlePostPage ? "cursor-auto" : "cursor-pointer"} ${
        singlePostPage ? "hover:border-none" : "hover:border-gray-400"
      }`}
    >
      <div className="flex flex-col h-full items-center bg-gray-200 rounded p-2">
        {userVoteValue === 1 ? (
          <IoArrowUpCircleSharp
            onClick={(event) => onVote(event, post, 1, post.communityId)}
            className="text-red-600 cursor-pointer"
            size={25}
          />
        ) : (
          <IoArrowUpCircleOutline
            onClick={(event) => onVote(event, post, 1, post.communityId)}
            className="text-gray-400 cursor-pointer"
            size={25}
          />
        )}
        <p>{post.voteStatus}</p>
        {userVoteValue === -1 ? (
          <IoArrowDownCircleSharp
            onClick={(event) => onVote(event, post, -1, post.communityId)}
            className="text-[#4379ff] cursor-pointer"
            size={25}
          />
        ) : (
          <IoArrowDownCircleOutline
            onClick={(event) => onVote(event, post, -1, post.communityId)}
            className="text-gray-400 cursor-pointer"
            size={25}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          {error && (
            <div className="bg-red-400 w-full">
              <p>Error Deleting Post</p>
              <p>{error}</p>
            </div>
          )}
          {homePage && (
            <div className="flex items-center">
              {post.communityImageUrl ? (
                <Image
                  src={post.communityImageUrl}
                  borderRadius="full"
                  boxSize="18px"
                  mr={2}
                />
              ) : (
                <Icon
                  as={FaReddit}
                  color="blue.500"
                  className="rouded-full w-5 mr-1"
                />
              )}
              <Link href={`r/${post.communityId}`}>
                <p
                  onClick={(event) => event.stopPropagation()}
                  className="font-bold hover:underline z-2"
                >{`r/${post.communityId}`}</p>
              </Link>
            </div>
          )}
          <div className="flex">
            <p className="text-xs">
              posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </p>
          </div>
          <h2 className="font-bold">{post.title}</h2>
          <p className="text-sm">{post.body}</p>
          {post.imageURL && (
            <div className="flex justify-center items-center p-2 max-h-full">
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius="4" />
              )}
              <img
                className={loadingImage ? "hidden" : "block"}
                src={post.imageURL}
                alt="Post Image"
                onLoad={() => setLoadingImg(false)}
              />
            </div>
          )}
        </div>
        <div className="flex ml-1 mb-0.5 text-gray-500 font-semibold">
          <div className="flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer">
            <BsChat size={19} />
            <p>{post.numberOfComments}</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer">
            <IoArrowRedoOutline size={25} />
            <p className="text-sm">Share</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer">
            <IoBookmarkOutline size={20} />
            <p className="text-sm">Save</p>
          </div>
          {loadingDelete ? (
            <Spinner />
          ) : (
            <>
              <div
                onClick={handleDelete}
                className="flex items-center gap-2 px-2 py-2.5 rounded hover:bg-gray-200 cursor-pointer"
              >
                <AiOutlineDelete size={20} />
                <p className="text-sm">Delete</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostItem;
