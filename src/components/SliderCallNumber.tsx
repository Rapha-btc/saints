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
} from "@chakra-ui/react";
import React from "react";

interface Props {
  onCollateralChange: (valueAsString: string, valueAsNumber: number) => void;
}

function SliderCallNumber({ onCollateralChange }: Props) {
  const [value, setValue] = React.useState(1);
  const handleChange = (whatever: string, value: number) => {
    onCollateralChange(whatever, value);
    setValue(value);
  };
  const handleChange2 = (value: number) => {
    onCollateralChange("whatever", value);
    setValue(value);
  };
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
        onChange={handleChange2}
        size={"md"}
        step={3}
        defaultValue={21}
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
