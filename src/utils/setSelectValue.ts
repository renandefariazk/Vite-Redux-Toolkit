import { FormHandles } from '@unform/core';
import { RefObject } from 'react';
// import { OptionTypeBase }  from "react-select";

export const setSelectValue = function<dataKeys>(
  value: keyof dataKeys,
  // options: OptionTypeBase[],
  options: any[],
  data: dataKeys,
  ref: RefObject<FormHandles>
) {
  if (data[value]) {
    const [filteredOption] = options.filter(
    option => option.value === data[value]
  )
  
    if (filteredOption && typeof value === 'string' ) {
      ref?.current?.setFieldValue(value, filteredOption);
    }
  }
}


// 
// setSelectValue('inProgress', filterProgress, data, formRef);