import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <HStack mr={4}>
        <Switch
          colorScheme="green"
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          size={"sm"}
        />
        <Text whiteSpace={"nowrap"} fontSize="13px" fontWeight="700">
          Dark Mode
        </Text>
      </HStack>
    </>
  );
};

export default ColorModeSwitch;
