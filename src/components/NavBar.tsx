import { Box, Button, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import ConnectWallet from "./ConnectWallet";
import StandardE from "./StandardE";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Box>
        {/* <Image src={logo} boxSize="60px"></Image> */}
        <ColorModeSwitch />
        <StandardE />
      </Box>
      <ConnectWallet />
    </HStack>
  );
};

export default NavBar;
