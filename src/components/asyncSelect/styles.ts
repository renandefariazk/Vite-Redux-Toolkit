import styled from 'styled-components';
import { StylesConfig, GroupBase } from 'react-select';

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
  readonly color?: string;
}

// Select style
interface SelectStyle
  extends StylesConfig<SelectOption, false, GroupBase<SelectOption>> {}

export const FieldError = styled.span.attrs({ className: "field-error" })`
  display: inline-block;
  color: #DE1745;
  font-size: 0.86rem;
  padding: 8px 0;
`;

export const FieldLabel = styled.label.attrs({ className: "field-label" })`
  display: block;
  font-size: 14px;
  font-family: "Gilroy-SemiBold";
  color: "#57575E";
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const DefaultSelectStyle: SelectStyle = {
  container: (provided, state) => ({
    ...provided,
    height: "auto",
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: +10,
  }),
  control: (provided, state) => ({
    ...provided,
    height: "inherit",
    borderColor: "#CACACC",
    borderRadius: "6px",
    background: state.isDisabled ? "#F0F0F0" : "#FFFFFF",
    outline: "none",
    fontSize: "12px",
    fontFamily: "Open Sans",
    fontWeight: "600",
    boxShadow: "none",
    ":hover": {
      borderColor: "#96969A",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 0.5rem",
    fontSize: "12px",
    margin: "0px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#2E2E36",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#2E2E36",
    textTransform: 'capitalize',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    background: "inherit",
    borderColor: "#96969A",
    borderRadius: "6px",
    "::-webkit-scrollbar": {
      "-webkit-appearance": "none",
    },
    "::-webkit-scrollbar:vertical": {
      width: "8px",
    },
    "::-webkit-scrollbar:horizontal": {
      display: "none"
      // height: "8px",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      border: `2px solid #FFFFFF`,
      backgroundColor: "#96969A",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "#FFFFFF",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? "#2E2E36" : "inherit",
    color: (() => {
      if (state.isDisabled) {
        return "#96969A";
      }
      if (state.isFocused) {
        return "#FFFFFF";
      }
      return state.data?.color ? state.data?.color : "inherit";
    })(),
    fontSize: "12px",
    fontFamily: "Open Sans",
    fontWeight: "600",
    ":hover": {
      background: state.isDisabled ? "#F5F5F5" : "#2E2E36",
    },
  }),
};

export const FieldContainer = styled.div.attrs({
  className: "field-container",
})`
  font-family: "Gilroy-Regular";
  font-size: 14px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-bottom: 16px;
  input:disabled {
    background: "#F0F0F0";
  }
`;

export const Container = styled(FieldContainer)``;
