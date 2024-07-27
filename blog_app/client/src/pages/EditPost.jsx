import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Editor from "../components/Editor";
import { BASE_URL } from "../utils/config";

const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${BASE_URL}/users/post/` + id)
        .then((response) => response.json())
        .then((postInfo) => {
          setTitle(postInfo.title);
          setContent(stripHtml(postInfo.content));
          setSummary(postInfo.summary);
        });
    };
    fetchData();
  }, [id]);

  const updatePost = async (ev) => {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", stripHtml(content));
      data.set("id", id);
      if (files?.[0]) {
        data.set("file", files?.[0]);
      }
      const response = await fetch(`${BASE_URL}/users/updatePost`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        toast({
          title: "Post updated.",
          description: "Your post has been successfully updated.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/post/" + id);
        }, 500);
      } else {
        toast({
          title: "Error.",
          description: "Something went wrong.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
      toast({
        title: "Error.",
        description: "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const formBgColor = useColorModeValue("white", "gray.700");
  const inputBgColor = useColorModeValue("gray.50", "gray.600");
  const buttonBgColor = useColorModeValue("brand.500", "brand.400");
  const buttonHoverBgColor = useColorModeValue("brand.600", "brand.500");

  return (
    <Box
      bg={formBgColor}
      p={6}
      borderRadius="md"
      boxShadow="md"
      maxWidth="600px"
      mx="auto"
      mt="75px"
      mb="10px"
    >
      <form onSubmit={updatePost}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              bg={inputBgColor}
            />
          </FormControl>
          <FormControl id="summary" isRequired>
            <FormLabel>Summary</FormLabel>
            <Input
              type="text"
              placeholder="Enter the summary"
              value={summary}
              onChange={(ev) => setSummary(ev.target.value)}
              bg={inputBgColor}
            />
          </FormControl>
          <FormControl id="file">
            <FormLabel>Upload Cover Image</FormLabel>
            <Input
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
              bg={inputBgColor}
            />
          </FormControl>
          <FormControl id="content" isRequired>
            <FormLabel>Content</FormLabel>
            <Editor value={content} onChange={setContent} />
          </FormControl>
          <Button
            type="submit"
            width="100%"
            bg={buttonBgColor}
            color="white"
            _hover={{ bg: buttonHoverBgColor }}
          >
            Update Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditPost;
