import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config.js";

const LatestPost = ({
  _id,
  title,
  content,
  summary,
  cover,
  createdAt,
  author,
}) => {
  return (
    <Link to={`/post/${_id}`}>
      <Flex
        width="100%"
        height="400px"
        position="relative"
        overflow="hidden"
        mt="95px"
        mb={6}
      >
        <Image
          src={`${BASE_URL}/` + cover}
          alt="Post cover"
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
          borderRadius={25}
        />
        <Box
          position="absolute"
          top="75%"
          left="50%"
          transform="translate(-50%, -50%)"
          background="rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          borderRadius="md"
          padding="4"
          color="white"
          width="95%"
        >
          <Text fontWeight="700">Featured</Text>
          <Heading size="lg" mb="2">
            {title}
          </Heading>
          <Text>{content.substring(0, 100) + "..."}</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default LatestPost;
