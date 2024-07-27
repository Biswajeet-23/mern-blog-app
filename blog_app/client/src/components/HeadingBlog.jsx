import {
  Text,
  Heading,
  Flex,
  Box,
  Input,
  useColorModeValue,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const HeadingBlog = () => {
  const toast = useToast();
  const inputBgColor = useColorModeValue("gray.50", "gray.600");
  const buttonBgColor = useColorModeValue("brand.500", "brand.400");
  const buttonHoverBgColor = useColorModeValue("brand.600", "brand.500");

  const handleSubscribe = () => {
    toast({
      title: "Subscribed",
      description: "You are subscribed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      justifyContent={"center"}
      flexDirection="column"
      alignItems={"center"}
    >
      <Heading>Inside Design: Stories and interviews</Heading>
      <Text fontWeight="600" mt={3}>
        Subscribe to learn about new product features, the latest in technology
        and updates.
      </Text>
      <Flex mt={4}>
        <Input type="text" placeholder="Enter your email" bg={inputBgColor} />
        <Button
          ml={3}
          bg={buttonBgColor}
          color="white"
          size="md"
          _hover={{ bg: buttonHoverBgColor }}
          onClick={handleSubscribe}
        >
          <Text fontSize="14px">Subscribe</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeadingBlog;
