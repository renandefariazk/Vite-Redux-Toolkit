import React, { useRef, useEffect, useState } from "react";

import ReactSelect, {
  // OptionTypeBase,
  Props as SelectProps
}  from "react-select";

import * as S from "./styles";
import { useField } from "@unform/core";

// interface InputProps extends SelectProps<OptionTypeBase, true> {
interface InputProps extends SelectProps<any, true> {
  name: string;
  label?: string;
  labelStyle?: Record<string, any>;
  required?: boolean;
  placeholder?: string;
  value?: any;
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

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: undefined,
      setValue: (ref: any, value: any) => {
        ref.state.value = value;
        setLastUpdate(new Date());
      },
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref?.state?.value) {
            return [];
          }
          return ref?.state?.value?.map(
            // (option: OptionTypeBase) => option.value
            (option: any) => option.value
          );
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      }
    });
  }, [selectRef, fieldName, registerField, rest.isMulti]);
  
  useEffect(() => {}, [lastUpdate]);

  return (
    <S.FieldContainer>
      {label && <Label />}
      <ReactSelect
        name={fieldName}
        styles={S.customStyles}
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



// Exemplo

// const filterPessoa = [{
//   value: "teste1",
//   label: "teste1",
// },
// {
//   value: "teste2",
//   label: "teste2",
// }];


// <Select
//   name="pessoa"
//   options={filterPessoa}
//   label={"Pessoa"}
//   placeholder={"Pessoa"}
// />