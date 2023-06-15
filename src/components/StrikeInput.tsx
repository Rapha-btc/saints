import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React from "react";

const StrikeInput = () => {
  return (
    <FormControl>
      {/* <FormLabel>Strike STX</FormLabel> */}
      <NumberInput max={3000} min={750} defaultValue={1500}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default StrikeInput;
