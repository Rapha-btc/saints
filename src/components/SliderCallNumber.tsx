import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  TagLabel,
} from "@chakra-ui/react";
import React from "react";

function SliderCallNumber() {
  const [value, setValue] = React.useState(1);
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <NumberInput
        max={100}
        min={1}
        defaultValue={1}
        maxW="100px"
        mr="2rem"
        value={value}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
        size={"md"}
        step={3}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          fontSize="sm"
          boxSize="32px"
          children={value * 3 + "m sats"}
        />
      </Slider>
    </Flex>
  );
}

export default SliderCallNumber;
