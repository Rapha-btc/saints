import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import useExpirations, { Expiration } from "../hooks/useExpirations";

interface Props {
  onSelectExpiration: (expiration: Expiration) => void;
  selectedExpiration: Expiration | null;
}

const ExpirationSelector = ({
  onSelectExpiration,
  selectedExpiration,
}: Props) => 
{
  const { data, isLoading, error } = useExpirations();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedExpiration?.name || "Expirations"}
      </MenuButton>
      <MenuList>
        {data.map((expiration) => (
          <MenuItem
            onClick={() => onSelectExpiration(expiration)}
            key={expiration.id}
          >
            {expiration.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ExpirationSelector;
