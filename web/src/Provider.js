import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function Provider({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export default Provider;
