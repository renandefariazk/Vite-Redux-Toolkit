import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { getAuth } from "../../redux/auth/thunks";

// css
import * as S from "./styles";
import LogoSvg from "../../assets/react.svg";
import { logout } from "../../redux/auth/slices";


export default function Login(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const userData = useSelector((state: any) => state.user);

  console.log("userData", userData);

  const handleSubmit = useCallback( async(data: any): Promise<void> => {
    // console.log("submit Data", data);
    await dispatch<any>(getAuth(data));
    // navigate("Home");

  }, [dispatch]);


  const persistFilter = useCallback(() => {
    if (formRef.current) {
      const keysOfOrdersFilter: (any)[] = [
        "username",
        "password",
      ];
      keysOfOrdersFilter.forEach((field) =>
        formRef.current?.setFieldValue(field, userData[field])
      );
    }
  }, [formRef, userData]);

  useEffect(() => persistFilter(), [persistFilter]);


  const clearFilter = useCallback((event: any) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.setFieldValue("username", "");
      formRef.current.setFieldValue("password", "");
    }
    dispatch(logout);
  }, []);

  return(
    <S.MainContainer>
      <S.LeftContainer>
          <S.LogoContainer>
            <img src={LogoSvg} alt="logo"/>
          </S.LogoContainer>
          <S.FormDivContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <S.FormContainer>
                <S.InputText name="username" type="text" placeholder="Email" />
                <S.InputText name="password" type="text" placeholder="Senha" />
                <S.Button type="submit" >Entrar</S.Button>
                <S.Button onClick={clearFilter}>Apagar</S.Button>
              </S.FormContainer>
            </Form>
          </S.FormDivContainer>
      </S.LeftContainer>
      <S.RightContainer>
      </S.RightContainer>
    </S.MainContainer>
  );
}