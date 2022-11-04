import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/Routing";

export const App = () => (
  <div>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ChakraProvider>
  </div>
);
