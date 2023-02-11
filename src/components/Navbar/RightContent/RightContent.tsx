import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Icons } from "./icons";
import { User } from "firebase/auth";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {


  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        { user ? <Icons/> : <AuthButtons /> } 
        <UserMenu user={user}/>
      </Flex>
    </>
  );
};

export default RightContent;
