import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex ml={1} maxWidth={user ? "auto" : "600px"} flexGrow={1} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon mb={1} color="gray.300" />
        </InputLeftElement>
        <Input
          fontSize="10pt"
          placeholder="Search Reddit"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
          mr={2}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
