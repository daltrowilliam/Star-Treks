import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import Logo from './img/logo.svg';

const MotherDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: 20% 80%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 0px;
  border: none;
  overflow-x: hidden;
  color: white;
  background-color: #000000;
`
const Header = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row: 1 / 2;
  box-sizing: border-box;
  padding-right: 40px;
  padding-bottom: 0px;
  border: none;
  color: #fdba12;
`
const LogoContainer = styled.div`
  display: flex;
  grid-column: 1 / 2;
  box-sizing: border-box;
  align-items: flex-end;
  margin: 5px;
  padding-left: 5px;
  padding-bottom: 0px;
  border: none;
`
const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-column: 2 / 3;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  border: none;
  border-bottom: solid;
  border-color: #bf7e04;
`
const TextoMenu = styled.p`
  font-weight: bold;
  font-size: 18px;
  padding: 0px;
  cursor: pointer;
  margin: 10px 5px;
  color: darkgray;
    :hover {
    color: #fdba12;
  };
`
const BodyContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-items: center;
  align-items: center;
  margin: 0px;
  padding-top: 20px;
  border: none;
`
const FormLogin = styled.form`
  width: 20vw;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  border: solid;
  border-radius: 5%;
  border-color: #fdba12;
  color: white;
  font-weight: 100;
`
const YellowButton = styled.button`
  width: 8vw;
  height: 6vh;
  margin: 5px;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  border-radius: 8%;
  color: black;
  background-color: #fdba12;
  :hover {
    background-color: #bf7e04;
  };
`
const Inputs = styled.input`
  width: 20vw;
  padding: 0px;
  margin: 30px 10px;
  border: none;
  border-bottom: solid;
  border-color: #22252a;
  background-color: black;
  color: white;
`
export const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const onChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  return { form, onChange };
};

const LoginPage = () => {
  const { form, onChange } = useForm({ email: "", password: "" });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      history.push("/trips/list");
    }
    
  }, [history]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    onChange(value, name);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      email: form.email,
      password: form.password
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/login",
        body
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/trips/list");
      })
      .catch((err) => {
        alert("Dados incorretos! Tente novamente")
        console.log(err);
      });
  }; 


  const goBack = () => {
    history.goBack();
  };

  return (
    <MotherDiv>
      <Header>
        <LogoContainer>
          <img src={Logo}></img>
        </LogoContainer>
        <Menu>
        <TextoMenu onClick={goBack}>VOLTAR</TextoMenu>
        </Menu>
      </Header>
      <BodyContainer>
        <FormLogin onSubmit={onSubmitForm}>
          <Inputs name={"email"} required value={form.email} type={"email"} onChange={handleInputChange} placeholder="Digite seu Email"></Inputs>
          <Inputs name={"password"} required value={form.password} type="password" onChange={handleInputChange} placeholder="Digite sua Senha"></Inputs>
          <YellowButton>Fazer Login</YellowButton>
      </FormLogin>
      </BodyContainer>
    </MotherDiv>
  );
};

export default LoginPage;