import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from './../../atoms/directoryMenuAtom';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory()
  return (
    <Flex
      position="fixed"
      bg="white"
      height="44px"
      padding="6px 12px"
      width="100%"
      justify={{ md: "space-between" }}
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex={10}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
      >
        <Image src="/images/redditFace.svg" alt="img" height="30px" mr={1} />
        <Image
          src="/images/redditText.svg"
          height="46px"
          alt="img"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
