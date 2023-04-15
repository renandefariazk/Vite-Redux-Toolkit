import styled, { css } from "styled-components";

export const Input = styled.input<{ isLoading?: boolean }>`
  font-size: 14px;
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  max-height: 50px;
  width: 100%;
  /* width: 100%;
  height: 100%; */

  &:disabled {
    background-color: #f1f1f1;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      max-width: 0;
      max-height: 0;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      padding-right: 32px;
    `}
`;

export const FieldLabel = styled.label`
  /* display: block;
  font-size: 14px;
  margin-bottom: 8px; */
  & {
    @media (max-width: 950px) {
      font-size: 0.74rem;
    }
  }
`;

export const FieldError = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 12px;
`;
export const FieldContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  position: relative; */

  /* &:not(:last-child) {
    margin-right: 16px;
  } */
`;
