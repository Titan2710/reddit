import PageContent from "@/components/layout/PageContent";
import { auth, firestore } from "@/firebase/clientApp";
import { NextPage } from "next";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import usePosts from "@/hooks/usePosts";
import { Post, PostVote } from "@/atoms/postsAtom";
import PostLoader from "@/components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import PostItem from "@/components/Posts/PostItem";
import CreatePostLink from "@/components/Community/CreatePostLink";
import useCommunityData from "@/hooks/useCommunityData";
import Recommendations from "@/components/Community/Recommendation";
import Premium from "@/components/Community/Premium";
import PersonalHome from "@/components/Community/PersonalHome";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );

        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("buildUserHomeFeed", error);
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
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
      console.log("buildNoUserHomeFeed", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVoteQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVoteDocs = await getDocs(postVoteQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("getUserPostVote", error);
    }
  };

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  
  }, [user, postStateValue.posts]);

  useEffect(() => {
    if (communityStateValue.mySnippets.length) buildUserHomeFeed();

  }, [communityStateValue.snippetFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();

  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>
        <Stack spacing={5}>
          <Recommendations />
          <Premium />
          <PersonalHome />
        </Stack>
      </>
    </PageContent>
  );
};

export default Home;
