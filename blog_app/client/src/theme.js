import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.100", "gray.900")(props),
        color: mode("black", "white")(props),
      },
    }),
  },
  colors: {
    brand: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088cc",
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#003f5e",
    },
    text: {
      primary: "#2d3436",
      secondary: "#636e72",
      muted: "#b2b2b2",
      primaryDark: "#f5f5f5",
      secondaryDark: "#d1d8e0",
      mutedDark: "#a0aec0",
    },
  },
});

export default customTheme;
