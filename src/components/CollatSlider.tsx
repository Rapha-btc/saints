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
  const [value, setValue] = React.useState(3);
  const handleChange = (value: number) => {
    setValue(value);
  };

  return (
    <Slider
      max={300}
      min={3}
      defaultValue={150}
      isReadOnly={false}
      flex="3"
      focusThumbOnChange={false}
      onChange={handleChange}
      onChangeEnd={onCollateralChange}
      size={"md"}
      step={3}
      colorScheme="orange"
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb
        fontSize="sm"
        boxSize="32px"
        children={value + "m"}
        color={"orange.600"}
      />
    </Slider>
  );
};

export default CollatSlider;
