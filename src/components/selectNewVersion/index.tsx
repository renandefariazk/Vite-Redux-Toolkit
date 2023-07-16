import React, { useRef, useEffect, useState } from "react";

import ReactSelect, { GroupBase, Props as SelectProps, SelectInstance } from "react-select";
import * as S from "./styles";
import { useField } from "@unform/core";

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
  readonly color?: string;
}

interface InputProps
  extends SelectProps<SelectOption, true, GroupBase<SelectOption>> {
  name: string;
  label?: string;
  labelStyle?: Record<string, any>;
  required?: boolean;
  placeholder?: string;
  value?: any;
  scheme?: "primary" | "secondary" | "tertiary";
}

type Props = InputProps;

export const Select: React.FC<Props> = ({
  name,
  label,
  labelStyle,
  required,
  placeholder,
  options,
  value,
  scheme,
  ...rest
}) => {
  const selectRef = useRef(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const Label = () => (
    <S.FieldLabel htmlFor={fieldName} style={labelStyle}>
      {label}
      {required && <span>*</span>}
    </S.FieldLabel>
  );

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref?.state?.selectValue) {
            return [];
          }
          return ref?.state?.selectValue.map(
            (option: SelectOption) => option.value
          );
        }

        return ref?.state?.selectValue[0]?.value || '';
      },
      setValue: (
        ref: SelectInstance<SelectOption, false, GroupBase<SelectOption>>,
        option: SelectOption
      ) => {
        ref?.setValue(option, 'select-option', option);
        setLastUpdate(new Date());
      },
      clearValue(ref: any) {
        ref?.setValue(null, 'select-option', null);
        setLastUpdate(new Date());
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  useEffect(() => {}, [lastUpdate]);

  return (
    <S.FieldContainer>
      {label && <Label />}
      <ReactSelect
        name={fieldName}
        styles={S.customStyles[scheme ? scheme : "primary"]}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="select"
        placeholder={placeholder}
        options={options}
        closeMenuOnSelect
        {...rest}
      />
      {error && <Error />}
    </S.FieldContainer>
  );
};
