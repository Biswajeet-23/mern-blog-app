import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const Post = ({ _id, title, content, summary, cover, createdAt, author }) => {
  const bgColor = useColorModeValue(
    "whiteAlpha.900",
    "rgba(255, 255, 255, 0.1)"
  );
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box width="420px" overflow="hidden" m="auto" color={color}>
      <Link to={`/post/${_id}`}>
        <Image
          src={`${BASE_URL}/` + cover}
          alt="No image"
          width={"100%"}
          height={"270px"}
          borderRadius="25px"
        />
      </Link>
      <VStack align="start" mt="4" spacing="2">
        <Link to={`/post/${_id}`}>
          <Heading size="md">{title}</Heading>
        </Link>
        <Text>{content.substring(0, 100) + "..."}</Text>
        <HStack spacing="0">
          <Image
            borderRadius="full"
            boxSize="30px"
            src={"http://127.0.0.4:4000/" + cover}
            alt={author.username}
          />
          <HStack spacing="0" ml="10px">
            <ChakraLink href="#">
              <Text fontWeight="700" fontSize="14px">
                {author.username}
              </Text>
            </ChakraLink>
            <Text fontWeight="700" fontSize="19px" ml="2px">
              •
            </Text>
            <Text fontWeight="700" fontSize="14px" ml="2px">
              {format(new Date(createdAt), "dd MMM yyyy")}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Post;
