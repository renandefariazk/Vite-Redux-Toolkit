import React, { useRef, useEffect, ComponentProps } from "react";

import * as S from "./styles";

interface InputProps extends ComponentProps<any> {
  label?: string;
  name: string;
  onClick: () => void;
}

type Props = InputProps;

export const ToggleInput: React.FC<Props> = ({ label, name, onClick, ...rest }) => {
  
  return (
      <S.FieldContainer htmlFor={'uniqueID'}>
        <S.Label>{label}</S.Label>
        <S.Checkbox
          onClick={onClick}
          name={name}
          id={'uniqueID'}
          defaultValue={1}
          type='checkbox'
          {...rest}
        />
        <S.ToggleContainer>
          <S.ToggleTrack>
            <S.ToggleHandler />
          </S.ToggleTrack>
        </S.ToggleContainer>
      </S.FieldContainer>
  );
};
