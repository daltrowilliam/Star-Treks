import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { useHistory, useParams } from "react-router-dom";
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
  width: 30vw;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
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
  margin: 20px 10px;
  border: none;
  border-bottom: solid;
  border-color: #22252a;
  background-color: black;
  color: white;
`
const Selects = styled.select`
  width: 20vw;
  padding: 0px;
  margin: 20px 10px;
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

const CandidateFormPage = () => {
  const { form, onChange } = useForm({ name: "", age: "", application: "", occupation: "", country: "Brasil" });
  const history = useHistory();
  const pathParams = useParams();
  const tripId = pathParams.id
  

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    onChange(value, name);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
        name: form.name,
        age: form.age,
        applicationText: form.application,
        profession: form.occupation,
        country: form.country
      };
      
      axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/trips/${tripId}/apply`,body
      )
        .then((res) => {
          alert("Candidatura Enviada!");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          console.log(form);
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
        <Inputs
          value={form.name}
          placeholder={"Nome do Candidato"}
          onChange={handleInputChange}
          name={"name"}
          type={"text"}
          pattern={"[A-Za-z??????????????????????????????????????????????????????????????,.?! ]{3,}"}
          required
        />
        <Inputs
          value={form.age}
          placeholder={"Idade"}
          onChange={handleInputChange}
          name={"age"}
          type={"number"}
          min="18"
          required
        />
        <Inputs
          value={form.application}
          placeholder={"Por que voc?? ?? um bom candidato(a)?"}
          onChange={handleInputChange}
          name={"application"}
          type={"text"}
          pattern={"[A-Za-z??????????????????????????????????????????????????????????????,.?! ]{30,}"}
          required
        />
        <Inputs
          value={form.occupation}
          placeholder={"Profiss??o"}
          onChange={handleInputChange}
          name={"occupation"}
          type={"text"}
          pattern={"[A-Za-z??????????????????????????????????????????????????????????????,.?! ]{4,}"}
          required
        />
        <Selects name={"country"} required onChange={handleInputChange} value={form.country}>
            <option value="??frica do Sul">??frica do Sul</option>
            <option value="Alb??nia">Alb??nia</option>
            <option value="Alemanha">Alemanha</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua">Antigua</option>
            <option value="Ar??bia Saudita">Ar??bia Saudita</option>
            <option value="Argentina">Argentina</option>
            <option value="Arm??nia">Arm??nia</option>
            <option value="Aruba">Aruba</option>
            <option value="Austr??lia">Austr??lia</option>
            <option value="??ustria">??ustria</option>
            <option value="Azerbaij??o">Azerbaij??o</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrein">Bahrein</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="B??lgica">B??lgica</option>
            <option value="Benin">Benin</option>
            <option value="Bermudas">Bermudas</option>
            <option value="Botsuana">Botsuana</option>
            <option value="Brasil">Brasil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulg??ria">Bulg??ria</option>
            <option value="Burkina Fasso">Burkina Fasso</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Camar??es">Camar??es</option>
            <option value="Camboja">Camboja</option>
            <option value="Canad??">Canad??</option>
            <option value="Cazaquist??o">Cazaquist??o</option>
            <option value="Chade">Chade</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Cidade do Vaticano">Cidade do Vaticano</option>
            <option value="Col??mbia">Col??mbia</option>
            <option value="Congo">Congo</option>
            <option value="Cor??ia do Sul">Cor??ia do Sul</option>
            <option value="Costa do Marfim">Costa do Marfim</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cro??cia">Cro??cia</option>
            <option value="Dinamarca">Dinamarca</option>
            <option value="Djibuti">Djibuti</option>
            <option value="Dominica">Dominica</option>
            <option value="EUA">EUA</option>
            <option value="Egito">Egito</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Emirados ??rabes">Emirados ??rabes</option>
            <option value="Equador">Equador</option>
            <option value="Eritr??ia">Eritr??ia</option>
            <option value="Esc??cia">Esc??cia</option>
            <option value="Eslov??quia">Eslov??quia</option>
            <option value="Eslov??nia">Eslov??nia</option>
            <option value="Espanha">Espanha</option>
            <option value="Est??nia">Est??nia</option>
            <option value="Eti??pia">Eti??pia</option>
            <option value="Fiji">Fiji</option>
            <option value="Filipinas">Filipinas</option>
            <option value="Finl??ndia">Finl??ndia</option>
            <option value="Fran??a">Fran??a</option>
            <option value="Gab??o">Gab??o</option>
            <option value="G??mbia">G??mbia</option>
            <option value="Gana">Gana</option>
            <option value="Ge??rgia">Ge??rgia</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Granada">Granada</option>
            <option value="Gr??cia">Gr??cia</option>
            <option value="Guadalupe">Guadalupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guiana">Guiana</option>
            <option value="Guiana Francesa">Guiana Francesa</option>
            <option value="Guin??-bissau">Guin??-bissau</option>
            <option value="Haiti">Haiti</option>
            <option value="Holanda">Holanda</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungria">Hungria</option>
            <option value="I??men">I??men</option>
            <option value="Ilhas Cayman">Ilhas Cayman</option>
            <option value="Ilhas Cook">Ilhas Cook</option>
            <option value="Ilhas Cura??ao">Ilhas Cura??ao</option>
            <option value="Ilhas Marshall">Ilhas Marshall</option>
            <option value="Ilhas Turks e Caicos">Ilhas Turks e Caicos</option>
            <option value="Ilhas Virgens (brit.)">Ilhas Virgens (brit.)</option>
            <option value="Ilhas Virgens(amer.)">Ilhas Virgens(amer.)</option>
            <option value="Ilhas Wallis e Futuna">Ilhas Wallis e Futuna</option>
            <option value="??ndia">??ndia</option>
            <option value="Indon??sia">Indon??sia</option>
            <option value="Inglaterra">Inglaterra</option>
            <option value="Irlanda">Irlanda</option>
            <option value="Isl??ndia">Isl??ndia</option>
            <option value="Israel">Israel</option>
            <option value="It??lia">It??lia</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Jap??o">Jap??o</option>
            <option value="Jord??nia">Jord??nia</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Latvia">Latvia</option>
            <option value="L??bano">L??bano</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Litu??nia">Litu??nia</option>
            <option value="Luxemburgo">Luxemburgo</option>
            <option value="Macau">Macau</option>
            <option value="Maced??nia">Maced??nia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Mal??sia">Mal??sia</option>
            <option value="Malaui">Malaui</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marrocos">Marrocos</option>
            <option value="Martinica">Martinica</option>
            <option value="Maurit??nia">Maurit??nia</option>
            <option value="Mauritius">Mauritius</option>
            <option value="M??xico">M??xico</option>
            <option value="Moldova">Moldova</option>
            <option value="M??naco">M??naco</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Nepal">Nepal</option>
            <option value="Nicar??gua">Nicar??gua</option>
            <option value="Niger">Niger</option>
            <option value="Nig??ria">Nig??ria</option>
            <option value="Noruega">Noruega</option>
            <option value="Nova Caled??nia">Nova Caled??nia</option>
            <option value="Nova Zel??ndia">Nova Zel??ndia</option>
            <option value="Om??">Om??</option>
            <option value="Palau">Palau</option>
            <option value="Panam??">Panam??</option>
            <option value="Papua-nova Guin??">Papua-nova Guin??</option>
            <option value="Paquist??o">Paquist??o</option>
            <option value="Peru">Peru</option>
            <option value="Polin??sia Francesa">Polin??sia Francesa</option>
            <option value="Pol??nia">Pol??nia</option>
            <option value="Porto Rico">Porto Rico</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Qu??nia">Qu??nia</option>
            <option value="Rep. Dominicana">Rep. Dominicana</option>
            <option value="Rep. Tcheca">Rep. Tcheca</option>
            <option value="Reunion">Reunion</option>
            <option value="Rom??nia">Rom??nia</option>
            <option value="Ruanda">Ruanda</option>
            <option value="R??ssia">R??ssia</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa Americana">Samoa Americana</option>
            <option value="Senegal">Senegal</option>
            <option value="Serra Leone">Serra Leone</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Singapura">Singapura</option>
            <option value="S??ria">S??ria</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="St. Kitts e Nevis">St. Kitts e Nevis</option>
            <option value="St. L??cia">St. L??cia</option>
            <option value="St. Vincent">St. Vincent</option>
            <option value="Sud??o">Sud??o</option>
            <option value="Su??cia">Su??cia</option>
            <option value="Sui??a">Sui??a</option>
            <option value="Suriname">Suriname</option>
            <option value="Tail??ndia">Tail??ndia</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tanz??nia">Tanz??nia</option>
            <option value="Togo">Togo</option>
            <option value="Trinidad e Tobago">Trinidad e Tobago</option>
            <option value="Tun??sia">Tun??sia</option>
            <option value="Turquia">Turquia</option>
            <option value="Ucr??nia">Ucr??nia</option>
            <option value="Uganda">Uganda</option>
            <option value="Uruguai">Uruguai</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietn??">Vietn??</option>
            <option value="Zaire">Zaire</option>
            <option value="Z??mbia">Z??mbia</option>
            <option value="Zimb??bue">Zimb??bue</option>
        </Selects>
          <YellowButton>Enviar</YellowButton>
      </FormLogin>
      </BodyContainer>
    </MotherDiv>
  );
};

export default CandidateFormPage;