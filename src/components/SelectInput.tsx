import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import {Field, useField} from 'formik';
import { ChangeEventHandler, OptionHTMLAttributes } from "react";

type selectInputInterface = OptionHTMLAttributes<HTMLSelectElement> & {
  label: string,
  values: {
    label: string,
    value: string
  }[],
  name: string,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput: React.FC<(selectInputInterface)> = (props) => {
  const [field, {error}] = useField(props);

  return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Select placeholder={props.placeholder} id={field.name} value={props.value} onChange={props.handleChange}>
          {props.values.map((p, index) => 
            <option key={index} value={p.value}>{p.label}</option>
          )}
        </Select>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
  )
}

export default SelectInput