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
      path: undefined,
      setValue: (ref: any, value: any) => {
        ref.state.value = value;
        setLastUpdate(new Date());
      },
      getValue: (ref: any) => {
        if (!ref?.state.value) return [];
        return ref?.state?.value?.map(
          // (option: OptionTypeBase) => option.value
          (option: any) => option.value
        )
      }
    });
  }, [selectRef, fieldName, registerField, rest.isMulti]);

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





//Exemplo

// const { data: companyData, loading: loadingCompanies } = useSelector(
//   (state: RootState) => state.company
// );

// const companyValid: Groups[] = [];

//   companyData?.forEach((item: CompanyData) => {
//     const companyAdapt = {
//       id: `${item.id}`,
//       value: `${item.id}`,
//       label: item.name_fantasy,
//     };
//     companyValid.push(companyAdapt);
//   });

// <MultiSelect
//   name="company"
//   options={companyValid}
//   label={"Company"}
//   placeholder={"Company"}
//   isLoading={loadingCompanies}
// />