import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GroupBase, SelectInstance } from 'react-select';
import ReactAsyncSelect, {
  AsyncProps as SelectProps,
} from 'react-select/async';
import * as S from './styles';

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
  readonly color?: string;
}

interface BaseProps
  extends SelectProps<SelectOption, false, GroupBase<SelectOption>> {}

interface Props extends BaseProps {
  name: string;
  id?: string;
  label?: string;
  onChange?: (option: SelectOption | null) => void;
}

interface SelectRef
  extends SelectInstance<SelectOption, false, GroupBase<SelectOption>> {}

export const AsyncSelect: React.FC<Props> = ({
  name,
  id,
  label,
  placeholder = ' ',
  onChange,
  ...rest
}) => {
  const selectRef = useRef<SelectRef>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [hasSelection, setHasSelection] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_lastUpdate, setLastUpdate] = useState<number>(
    new Date().getUTCMilliseconds()
  );

  const handleChange = useCallback(
    (option: SelectOption | null): void => {
      onChange && onChange(option);
      setHasSelection(option !== null);
    },
    [onChange]
  );

  const LabelComponent = useCallback((): JSX.Element => {
    if (!label) return <></>;
    return <S.FieldLabel htmlFor={id || fieldName}>{label}</S.FieldLabel>;
  }, [fieldName, id, label]);

  const ErrorComponent = useCallback((): JSX.Element => {
    if (!error) return <></>;
    return <S.FieldError>{error}</S.FieldError>;
  }, [error]);

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
      setValue: (ref: SelectRef, option: SelectOption) => {
        ref?.setValue(option, 'select-option', option);
        setLastUpdate(new Date().getUTCMilliseconds());
      },
      clearValue(ref: SelectRef) {
        ref?.setValue(null, 'deselect-option');
        setLastUpdate(new Date().getUTCMilliseconds());
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <S.Container>
      <LabelComponent />
      <ReactAsyncSelect
        className={hasSelection ? 'has-selection' : ''}
        ref={selectRef}
        name={fieldName}
        id={id || fieldName}
        styles={S.DefaultSelectStyle}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={defaultValue}
        menuPlacement='bottom'
        {...rest}
      />
      <ErrorComponent />
    </S.Container>
  );
};



{/* <AsyncSelect
  name="product"
  label=""
  placeholder={Produto}
  menuPlacement="top"
  loadOptions={searchProducts}
  // onChange={changeProduct} // apenas um onchange para salvar a cada modificação feita, porque onde foi feito não tinha um button submit
  defaultOptions={productsOptions}
  isLoading={loadingProducts}
  minMenuHeight={500}
  cacheOptions
  isClearable
/> */}