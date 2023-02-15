import PageContent from "@/components/layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";

import React from "react";
import { auth } from '@/firebase/clientApp';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from 'recoil';
import { communityState } from '@/atoms/communitiesAtom';

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  
  return (
      <PageContent>
        <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>Create a post</Text>
            </Box>
            {user && <NewPostForm user={user} />} 
        </>
        <>{/* about */}</>
      </PageContent>
  );
};

export default SubmitPostPage;
