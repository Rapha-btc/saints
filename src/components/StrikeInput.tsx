import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react";

interface Props {
  onStrikeChange: (valueAsString: string, valueAsNumber: number) => void;
}

const StrikeInput = ({ onStrikeChange }: Props) => {
  return (
    <FormControl>
      <NumberInput
        // textAlign="center"
        max={3000}
        min={750}
        defaultValue={1500}
        onChange={onStrikeChange}
        color={"blue.600"}
        alignContent={"right"}
      >
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
