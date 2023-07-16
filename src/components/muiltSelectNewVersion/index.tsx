import React, { useRef, useEffect, useState } from "react";

import ReactSelect, {
  Props as SelectProps
}  from "react-select";
import * as S from "./styles";
import { useField } from "@unform/core";

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
  readonly color?: string;
}

interface InputProps extends SelectProps<SelectOption, true> {
  name: string;
  label?: string;
  labelStyle?: Record<string, any>;
  required?: boolean;
  placeholder?: string;
  value?: any;
}
type Props = InputProps;

export const MultiSelect: React.FC<Props> = ({
  name,
  label,
  labelStyle,
  required,
  placeholder,
  options,
  value,
  ...rest
}) => {
  const selectRef = useRef(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const Label = () => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
    </S.FieldLabel>
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (!ref?.state?.selectValue) {
          return [];
        }
        return ref.state.selectValue.map((option: any) => option.value);
      },
      setValue: (ref, options) => {
        ref.setValue(options, 'select-option', options);
        setLastUpdate(new Date());
      },
      clearValue(ref) {
        ref.setValue([], 'select-option', []);
        setLastUpdate(new Date());
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.FieldContainer>
      {label && <Label />}
      <ReactSelect
        isMulti
        name={fieldName}
        styles={S.customStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="multi-select"
        placeholder={placeholder}
        options={options}
        closeMenuOnSelect={false}
        {...rest}
      />
    </S.FieldContainer>
  );
};
