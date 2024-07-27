import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context_api/UserContext";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo, setToken } = useContext(UserContext);
  const toast = useToast();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { username, userId, token } = data;
        setUserInfo({ id: userId, username: username });
        setToken(token);
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed.",
          description: "Invalid username or password.",
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

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const formBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  );
  const inputBgColor = useColorModeValue("gray.50", "gray.600");
  const placeholderColor = useColorModeValue("text.muted", "text.mutedDark");
  const headingColor = useColorModeValue("gray.50", "gray.200");
  const buttonBgColor = useColorModeValue("brand.500", "brand.400");
  const buttonHoverBgColor = useColorModeValue("brand.600", "brand.500");
  const backgroundImage = useColorModeValue(
    "url('/assets/loginLight.jpg')",
    "url('/assets/loginDark.jpg')"
  );

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
      zIndex="1"
    >
      <Box
        maxWidth="400px"
        width="100%"
        p={6}
        boxShadow="md"
        borderRadius="md"
        bg={formBgColor}
        backdropFilter="blur(10px) "
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Heading mb={6} textAlign="center" color={headingColor}>
          Login
        </Heading>
        <form onSubmit={handleRegister}>
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsername}
              bg={inputBgColor}
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              bg={inputBgColor}
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>
          <Button
            type="submit"
            width="100%"
            bg={buttonBgColor}
            color="white"
            _hover={{ bg: buttonHoverBgColor }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
