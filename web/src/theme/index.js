import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

import Button from "./components/button";
import Input from "./components/input";
import Select from "./components/select";
import Divider from "./components/divider";
import Image from "./components/image";

const theme = extendTheme(
  {
    colors: {
      primary: {
        50: "#e0fcf4",
        100: "#c0eedf",
        200: "#9de0cc",
        300: "#78d2b7",
        400: "#54c5a3",
        500: "#3aab89",
        600: "#2a856b",
        700: "#1b5f4c",
        800: "#093a2d",
        900: "#00160d",
      },
      dimmed: "#3f3f3f",
      imageBg: "#e6e6e6",
    },
    components: {
      Button,
      Input,
      Select,
      Divider,
      Image,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  }),
  withDefaultVariant({
    variant: "outline",
  })
);

export default theme;
