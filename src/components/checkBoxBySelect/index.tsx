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

export const CheckboxBySelect: React.FC<Props> = ({
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


  useEffect(() => {
    if(defaultValue.length){
      const idValidArray: any[] = [];
      defaultValue.forEach((element: any) => {
        idValidArray.push(element.value);
      });
      inputRefs.current.map(i => idValidArray.includes(i.id) ? i.checked = true : i.checked = false);
    } else{
      inputRefs.current.map(i => i.checked = false);
    }
  }, [defaultValue])

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

// const [checkDefault, setCheckDefault] = useState([{id: "", value: ""}]);

// const { data: responsibleData, loading: responsibleLoading } = useSelector(
//   (state: RootState) => state.responsibles
// );

// const responsibleValid: Groups[] = [];

// responsibleData?.forEach((item: ResponsibleData) => {
//   const groupAdapt = {
//     id: `${item.id}`,
//     value: `${item.id}`,
//     label: item.name
//   }
//   responsibleValid.push(groupAdapt)
// });

// <CheckboxBySelect
//   isLoading={responsibleLoading}
//   options={responsibleValid}
//   defaultOptions={checkDefault}
//   name='responsiblesArray'
//   label={"Responsaveis"}
// />