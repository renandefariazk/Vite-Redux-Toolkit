import { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { getAuth } from "../../redux/auth/thunks";

// css
import * as S from "./styles";
import LogoSvg from "../../assets/react.svg";
import { logout } from "../../redux/auth/slices";
import { Modal, ModalCloseButton } from "../../components/modal";
import IsLoading from "../../components/loadingA";

import * as Yup from "yup";
import { useValidation } from "../../utils/hook";
import { RootState } from "../../redux/store";


export default function Login(){
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const formCreateRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();

  const userData = useSelector((state: any) => state.user);
  // const {loading: loadingUserData} = useSelector((state: any) => state.user);

  // const createLoginData = useSelector((state: any) => state.createLogin);
  const {loading: loadingCreateLogin} = useSelector((state: RootState) => state.createLogin);

  console.log("userData", userData);
  // console.log("createLoginDataData", createLoginData);

  // const handleSubmit = useCallback( async(data: any): Promise<void> => {
  //   // console.log("submit Data", data);
  //   await dispatch<any>(getAuth(data));
  //   // navigate("Home");

  // }, [dispatch]);

  const handleSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {

        console.log("data", data);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Campo Necessario"),
          password: Yup.string().required("Campo Necessario"),

          // roles: Yup.array().of(
          //   Yup.object().shape({
          //     role_id: Yup.string(),
          //   })
          // ),
        });

        const validData = await schema.validate(
          data,
          // {
          //   username,
          //   password,
          //   roles: roles.map((id: string) => ({ role_id: id })),
          // },
          {
            abortEarly: false,
          }
        );

        await dispatch<any>(getAuth(data));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );


  
  const handleCreateSubmit = useCallback( async(data: any): Promise<void> => {
    console.log("Create Data", data);
    // await dispatch<any>(getAuth(data));
    // navigate("Home");
    setModalOpen(false);
  }, [dispatch]);


  const persistField = useCallback(() => {
    if (formCreateRef.current) {
      const keysOfOrdersFilter: (any)[] = [
        "username",
        "password",
      ];
      keysOfOrdersFilter.forEach((field) =>
      formCreateRef.current?.setFieldValue(field, userData[field])
      );
    }
  }, [formCreateRef, userData]);

  useEffect(() => persistField(), [persistField]);


  const clearField = useCallback((event: any) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.setFieldValue("username", "");
      formRef.current.setFieldValue("password", "");
    }
    dispatch(logout);
  }, [formCreateRef]);

  const clearFieldModal = useCallback((event: any) => {
    event.preventDefault();
    if (formCreateRef.current) {
      formCreateRef.current.setFieldValue("username", "");
      formCreateRef.current.setFieldValue("password", "");
    }
    dispatch(logout);
  }, [formCreateRef]);

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
                <S.Button onClick={clearField}>Apagar</S.Button>
              </S.FormContainer>
            </Form>

            <S.ButtonModal onClick={() => { setModalOpen(true) }}>Criar Conta</S.ButtonModal>

            <Modal isOpen={modalOpen} onClickOutside={ () => { setModalOpen(false) }}>
              <S.ModalContainer>
                <ModalCloseButton onClick={ () => { setModalOpen(false) }} backgroundColor={"red"} borderRadius={"15px"}/>
                <Form ref={formCreateRef} onSubmit={handleCreateSubmit}>
                <S.FormContainerModal>
                  <S.InputText name="username" type="text" placeholder="Email" />
                  <S.InputText name="password" type="text" placeholder="Senha" />
                  <S.Button type="submit" > {loadingCreateLogin ? <IsLoading /> : "Entrar"} </S.Button>
                  <S.Button onClick={clearFieldModal}>Apagar</S.Button>
                </S.FormContainerModal>
              </Form>
              </S.ModalContainer>
            </Modal>

          </S.FormDivContainer>
      </S.LeftContainer>
      <S.RightContainer>
      </S.RightContainer>
    </S.MainContainer>
  );
}