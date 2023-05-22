import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../components/Layout/PageContent";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { Post } from "../atoms/PostAtom";
import PostLoader from "../components/Posts/PostLoader";
import PostItem from "../components/Posts/PostItem";
import CreatePostLink from "../components/Community/CreatePostLink";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    setPostStateValue,
    postStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFeed = () => {};

  const buildNoUserHomeFeed = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed Error: ", error);
    }
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    console.log("HomePage post fetch");
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        Test
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          postStateValue.posts.map((post) => (
            <div className="flex flex-col">
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage={true}
              />
            </div>
          ))
        )}
      </>
      <></>
    </PageContent>
  );
}
