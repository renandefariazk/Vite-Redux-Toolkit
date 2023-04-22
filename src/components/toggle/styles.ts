import styled from "styled-components";
// import { Colors, Fonts } from "styles/constants";

export const Checkbox = styled.input`
  position: absolute;
  left: -30000px;
`;

export const Label = styled.div`
  /* font-family: {Fonts.GilroyRegular}; */
  font-family: 'Gilroy-Regular';
  color: #000;
  margin-right: 8px;
`;

export const ToggleContainer = styled.div.attrs({
  className: "toogle-container",
})`
  width: 34px;
  display: flex;
  align-items: center;
`;

export const ToggleTrack = styled.div.attrs({ className: "track" })`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  /* background-color: {Colors.Peach}66; */
  background-color: white;
  position: relative;
`;

export const ToggleHandler = styled.div.attrs({ className: "handler" })`
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  /* background-color: {Colors.Peach}; */
  background-color: white;
  margin-left: 0px;
  transition: margin-left 120ms linear;
`;

export const FieldContainer = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 5px;
  align-items: center;
  border-radius: 4px;
  height: 50px;
  padding: 0px 16px;

  cursor: pointer;
  > input:checked + div.toogle-container {
    div.handler {
      /* background-color: {Colors.Green}; */
      background-color: green;
      margin-left: 20px;
    }
    div.track {
      /* background-color: {Colors.Green}66; */
      background-color: green;
    }
  }
`;