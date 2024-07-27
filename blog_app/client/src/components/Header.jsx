import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context_api/UserContext";
import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    toast({
      title: "Logout successful.",
      description: "You have successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    await logout();
    navigate("/login");
  };

  const textColor = useColorModeValue("text.seondary", "text.primaryDark");
  const buttonTextColor = useColorModeValue("brand.800", "white");
  const buttonColor = useColorModeValue("brand.500", "brand.400");
  const formBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  );

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      p="2"
      color={textColor}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="10"
      boxShadow="sm"
      borderRadius="md"
      bg={formBgColor}
      backdropFilter="blur(10px) "
      border="0px solid rgba(255, 255, 255, 0.18)"
    >
      <Link to="/" className="logo">
        <Text fontSize="20" fontWeight="800">
          MyBlog
        </Text>
      </Link>
      <Flex alignItems={"center"}>
        <ColorModeSwitch />
        {token ? (
          <Flex alignItems={"center"}>
            <Link to="/create">
              <Button
                variant="solid"
                mx="2px"
                bg={buttonColor}
                textColor={buttonTextColor}
                borderRadius="25px"
                color={"white"}
                size={"md"}
              >
                <Text fontWeight="750" fontSize="14px">
                  Create Post
                </Text>
              </Button>
            </Link>
            <Button
              variant="outline"
              mx="2"
              size={"md"}
              borderColor={buttonColor}
              borderWidth="2px"
              borderRadius="25px"
              onClick={handleLogout}
            >
              <Text
                fontWeight="750"
                fontSize="14px"
                textColor={buttonTextColor}
              >
                Logout
              </Text>
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Link to="/login">
              <Button
                variant="outline"
                mx="2"
                size={"md"}
                borderColor={buttonColor}
                borderWidth="2px"
                borderRadius="25px"
              >
                <Text
                  fontWeight="750"
                  fontSize="14px"
                  textColor={buttonTextColor}
                >
                  Login
                </Text>
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                mx="2"
                size={"md"}
                borderColor={buttonColor}
                borderWidth="2px"
                borderRadius="25px"
              >
                <Text
                  fontWeight="750"
                  fontSize="14px"
                  textColor={buttonTextColor}
                >
                  Register
                </Text>
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
