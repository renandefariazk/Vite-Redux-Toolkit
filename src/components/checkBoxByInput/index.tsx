import React, { useEffect, useRef, InputHTMLAttributes, useState } from "react";
import { useField } from "@unform/core";

import * as S from "./styles";
// import { ActionsData } from "contracts/Auth";
import IsLoading from "../loadingA";

interface Options {
    id: string;
    value: string;
    label?: string;
  }

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  defaultOptions?: Options[] | undefined;
  options: Options[] | undefined;
  direction?: 'row' | 'column';
  fixWidth?: string;
  isLoading?: boolean;
}

export const CheckboxInput: React.FC<Props> = ({
  name,
  label,
  options,
  defaultOptions,
  direction,
  fixWidth,
  isLoading,
  className = "field-container",
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, defaultValue = defaultOptions, registerField, error } = useField(name);
  
  let checking = false;

  const Label = () =>
    <S.FieldLabel 
      onClick={() => {
        inputRefs.current.map(i => i.checked = !checking);
        checking = !checking;
      }}
      htmlFor={fieldName}>{label}
    </S.FieldLabel>;

  const Error = () => <S.FieldError>{error}</S.FieldError>;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values && values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField, inputRefs]);

  return (
    <S.FieldContainer className={className}>
      {label && <Label />}

      <S.OptionsContainer direction={direction} >
        {isLoading ? <IsLoading/> : options && Array.isArray(options) && options.map((option, index) => (
          <S.Option htmlFor={option.id} key={option.id} fixWidth={fixWidth}>
            <S.Input
              type="checkbox"
              ref={(ref) =>
                (inputRefs.current[index] = ref as HTMLInputElement)
              }
              defaultChecked={options && Array.isArray(options) && defaultValue?.find((dv: any) => dv?.id === option?.id ? true : false)}
              value={option.value}
              id={option.id}
            />
            <S.Icons>
              <S.CheckedIcon />
              <S.UncheckedIcon />
            </S.Icons>
            {option?.label}
          </S.Option>
        ))}
      </S.OptionsContainer>
      {error && <Error />}
    </S.FieldContainer>
  );
};



// Exemplo

// const { data: rolesData, loading: rolesLoading} = useSelector(
//   (state:RootState) => state.roles
// );

// const rolesValid:Groups[] = [];
  
//   rolesData?.forEach((item:RoleData)=>{
//     const groupAdapt = {
//       id: `${item.id}`,
//       value: `${item.id}`,
//       label: item.name
//     }
//     rolesValid.push(groupAdapt)
//   });

// <CheckboxInput isLoading={rolesLoading} options={rolesValid} name='roles' label={"Roles"}/>

// Ou utilizando defaultOptions

// const userRoles = userData?.user_roles.map(item => ({
//   id: `${item.role?.id}`,
//   label: item.role?.name,
//   value: `${item.role?.id}`,
// }))

// <CheckboxInput
// isLoading={rolesLoading}
// options={rolesValid}
// defaultOptions={userRoles}
// name='roles'
// label={"Roles"} />