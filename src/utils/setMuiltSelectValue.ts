import { FormHandles } from '@unform/core';
import { RefObject } from 'react';
// import { OptionTypeBase }  from "react-select";

export const setMultiSelectValue = function<dataKeys>(
  value: keyof dataKeys,
  // options: OptionTypeBase[],
  options: any[],
  data: dataKeys,
  ref: RefObject<FormHandles>
) {
  const passedOption = data[value];
  if (passedOption && passedOption instanceof Array) {
    const filteredOptions = options.filter(
      option => passedOption.includes(option.value)
    );
    
    if (filteredOptions && typeof value === 'string') {
      ref?.current?.setFieldValue(value, filteredOptions); 
    }
  }
}

//
// setMultiSelectValue('company', companyValid, data, formRef);