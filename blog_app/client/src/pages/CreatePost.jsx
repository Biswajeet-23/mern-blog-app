import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
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
import { BASE_URL } from "../utils/config.js";

const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userForm = new FormData();
      userForm.set("title", title);
      userForm.set("summary", summary);
      userForm.set("content", stripHtml(content));
      userForm.set("file", files[0]);
      const response = await fetch(`${BASE_URL}/users/newPost`, {
        method: "POST",
        body: userForm,
        credentials: "include",
      });
      if (response.status === 200) {
        toast({
          title: "Post created.",
          description: "Your post has been successfully created.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
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
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              bg={inputBgColor}
            />
          </FormControl>
          <FormControl id="summary" isRequired>
            <FormLabel>Summary</FormLabel>
            <Input
              type="text"
              placeholder="Enter the summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              bg={inputBgColor}
            />
          </FormControl>
          <FormControl id="file" isRequired>
            <FormLabel>Upload Cover Image</FormLabel>
            <Input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
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
            Create Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreatePost;
