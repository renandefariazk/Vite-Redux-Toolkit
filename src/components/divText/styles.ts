import styled, { css } from "styled-components";

export const getScrollbarStyle = (
  bgColor = "#E9E9E9",
  fgColor = "#96969A"
) => {
  return css`
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    ::-webkit-scrollbar:vertical {
      width: 8px;
    }
    ::-webkit-scrollbar:horizontal {
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 2px solid ${bgColor};
      background-color: ${fgColor};
    }
    ::-webkit-scrollbar-track {
      background-color: ${bgColor};
      border-radius: 6px;
    }
  `;
};

export const DivMensage = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  color: #57575E;
  background-color: #fff;
  border-radius: 4px;
  min-height: 96px;
  max-height: 12rem;
  resize: none;
  width: 100%;
  overflow: auto;
  ${getScrollbarStyle()};
`