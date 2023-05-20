import { Post, postState } from "@/src/atoms/PostAtom";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";

type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async (commentText: string) => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);
      //create document
      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      //update post numberOfComments
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update client recoil state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        numberOfComments: prev.selectedPost?.numberOfComments! + 1,
      }));

      setCreateLoading(false);
    } catch (error) {}
  };

  const onDeleteComment = async (comment: any) => {
    //delete document
    //update post numberOfComments
    // update client recoil state
  };

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex flex-col pr-4 pl-10 mb-6 w-full">
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <CommentItem
            comment={comment}
            onDeleteComment={onDeleteComment}
            loadingDelete={false}
            userId={user?.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Comments;
