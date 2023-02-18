import PageContent from "@/components/layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";

import React from "react";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import About from "@/components/Community/About";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} communityImageURL={communityStateValue?.currentCommunity?.imageURL}/>}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
