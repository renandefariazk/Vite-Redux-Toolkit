import styled from 'styled-components';
// import { Colors, ColorScheme, Fonts } from 'styles/constants';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 24px;
  gap: 4px;
`;

interface ButtonContract {
  active?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<ButtonContract>`
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? "#FFFFFF" : "#57575E")};
  background: ${({ active }) => (active ? "#292D41" : "#FFFFFF")};
  font-size: 14px;
  font-family: ${"Gilroy-Bold"};
  border-radius: 6px;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: ${"#E9E9E9"};
    color: ${"#57575E"};
  }
  :disabled {
    opacity: 0.5;
  }
`;

export const AltButton = styled(Button)`
  width: auto;
  padding: 0 8px;
`;
