import styled, { Keyframes } from "styled-components";
import { Close } from "@styled-icons/ionicons-sharp";

interface AnimatedContainer {
  animation: Keyframes;
}
interface ModalOverlayProps {
  isOpen: boolean;
  padding?: string;
}

export const ModalOverlay = styled.div.attrs({
  className: "modal-overlay",
})<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: ${(props) => (props.padding ? props.padding : "2rem")};
  overflow: auto;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const ContentWrapper = styled.div.attrs({
  className: "content-wrapper",
})<AnimatedContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  animation: ${(props) => props.animation} 200ms;
  div:first-child {
    pointer-events: all;
  }
`;

interface IButtonFechar {
  backgroundColor: string;
  boderRadius?: string;
}

export const CloseButton = styled.button<IButtonFechar>`
  /* background-color: transparent; */
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "transparent"};
  border-radius: ${(props) => props.boderRadius ? props.boderRadius : "0px"};
  padding: 4px 0;
  margin-left: auto;
  transition: transform 300ms linear;
  &:hover {
    transform: scale(0.9);
  }
  &:active {
    transform: scale(0.8);
  }
`;

export const CloseIcon = styled(Close).attrs({
  size: 24,
})`
  color: #000000;
`;