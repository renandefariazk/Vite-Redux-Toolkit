import styled from "styled-components";
import { Input } from "../../components/input";
import LogoPng from "../../assets/FundaHC_Logo.png";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`

export const LeftContainer = styled.div`
  position: relative;
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`

export const RightContainer = styled.div`
  position: relative;
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(#7A13AB, #000);
`

export const FormDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 15px;
  height: 35%;
  max-height: 20rem;
  width: 80%;
  max-width: 25rem;
  border: 1px solid #000;
  margin-bottom: 8rem;

  form {
    height: 100%;
    width: 100%;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const FormContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 15px;
`

export const InputText = styled(Input)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  height: 18%;
  width: 50%;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`

export const LogoContainer = styled.div`
  height: 30%;
  max-height: 300px;
  max-width: 300px;
  width: 50%;
  margin: 10px 0px;

  img{
    height: 100%;
    width: 100%;
  }
`

export const ButtonModal = styled.p`
  cursor: pointer;
  color: #00ff;
  transition: transform 300ms linear;
  &:hover {
    transform: scale(0.9);
  }
  &:active {
    transform: scale(0.8);
  }
`

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  flex-direction: column;
  background-color: #ffff;
  border-radius: 4px;
  padding: 40px;
  margin: 32px 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff9;
    border-radius: 3px;
  }
`;