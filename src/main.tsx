import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import "./index.css";
import { Connect } from "@stacks/connect-react";
import { userSession } from "./components/ConnectWallet";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks React Template",
          // todo:
          icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Connect>
  </React.StrictMode>
);
