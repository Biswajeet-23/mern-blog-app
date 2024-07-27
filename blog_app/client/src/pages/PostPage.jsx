import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context_api/UserContext";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const response = await fetch(`${BASE_URL}/users/post/${id}`);
        const data = await response.json();
        setPostInfo(data);
      };
      fetchPost();
    } catch (err) {
      console.error(err.message);
    }
  }, [id]);

  const formattedDate = postInfo?.createdAt
    ? format(new Date(postInfo.createdAt), "dd MMM yyyy")
    : "Invalid date";

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const headingColor = useColorModeValue("brand.600", "brand.400");
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const subTextColor = useColorModeValue(
    "text.secondary",
    "text.secondaryDark"
  );
  const editButtonBg = useColorModeValue("brand.500", "brand.400");
  const editButtonHoverBg = useColorModeValue("brand.600", "brand.500");

  return (
    <Box bg={bgColor} minHeight="100vh" py={10} mt="70px">
      <VStack spacing={6} align="start" maxW="4xl" mx="auto" px={4}>
        <Heading color={headingColor}>{postInfo?.title}</Heading>
        <HStack spacing={0}>
          <Image
            borderRadius="full"
            boxSize="30px"
            src={`${BASE_URL}/${postInfo?.cover}`}
            alt={postInfo?.author.username}
          />
          <Text color={subTextColor} fontWeight="700" ml="10px">
            by @{postInfo?.author.username}
          </Text>
          <Text fontWeight="700" fontSize="19px" ml="5px">
            •
          </Text>
          <Text color={subTextColor} fontWeight="700" ml="5px">
            <time>{formattedDate}</time>
          </Text>
        </HStack>
        {userInfo?.id === postInfo?.author._id && (
          <Box>
            <Link to={`/edit/${postInfo?._id}`}>
              <Button
                bg={editButtonBg}
                color="white"
                _hover={{ bg: editButtonHoverBg }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ marginRight: "8px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit this post
              </Button>
            </Link>
          </Box>
        )}
        <Image
          src={`${BASE_URL}/${postInfo?.cover}`}
          alt="No image"
          borderRadius="md"
          boxShadow="md"
        />
        <Text color={textColor} whiteSpace="pre-line">
          {postInfo?.content}
        </Text>
      </VStack>
    </Box>
  );
};

export default PostPage;
