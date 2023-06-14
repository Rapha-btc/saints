import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Button } from "@chakra-ui/react";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <Button colorScheme="teal" variant="outline" onClick={disconnect}>
          Disconnect
        </Button>
        {/* <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p> */}
      </div>
    );
  }

  return (
    <Button colorScheme="teal" variant="outline" onClick={authenticate}>
      Connect
    </Button>
  );
};

export default ConnectWallet;
