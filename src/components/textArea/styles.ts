import styled, { css } from "styled-components";

export const TextArea = styled.textarea<{ isLoading?: boolean }>`
  font-family: 'Open Sans';
  font-size: 14px;
  color: white;
  background-color: #fff;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  height: 12rem;
  max-height: 15rem;
  resize: none;
  width: 100%;

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
  display: block;
  font-family: 'Gilroy-SemiBold';
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
`;

export const FieldError = styled.span`
  display: block;
  font-family: 'Gilroy-SemiBold';
  font-size: 14px;
  color: red;
  margin-top: 8px;
  margin-bottom: 12px;
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;
