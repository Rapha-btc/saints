import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  onCollateralChange: (valueAsNumber: number) => void;
}

const CollatSlider = ({ onCollateralChange }: Props) => {
  const [value, setValue] = React.useState(1);
  const handleChange = (value: number) => {
    setValue(value);
  };

  return (
    <Slider
      max={100}
      min={1}
      defaultValue={1}
      isReadOnly={false}
      flex="1"
      focusThumbOnChange={false}
      onChange={handleChange}
      onChangeEnd={onCollateralChange}
      size={"md"}
      step={1}
      colorScheme="orange"
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb
        fontSize="sm"
        boxSize="32px"
        children={value * 3 + "m"}
        color={"orange.600"}
      />
    </Slider>
  );
};

export default CollatSlider;
