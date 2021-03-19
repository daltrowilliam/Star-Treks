import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import { useHistory, useParams } from "react-router-dom";
import { useProtectedPage } from "../hooks/useProtectedPage";
import Logo from './img/logo.svg';
import DateIcon from './img/calendario.svg';

const MotherDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: 20% 80%;
  row-gap: 20px;
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
  padding-left: 25px;
  cursor: pointer;
  margin: 10px 5px;
  color: darkgray;
  :hover {
    color: #fdba12;
  };
`
const BodyContainer = styled.div`
  width: 100vw;
  display: grid;
  //box-sizing: border-box;
  justify-items: center;
  align-items: center;
  grid-template-columns: 20% 15% 65%;
  grid-template-rows: 150px 1fr 1fr;
  grid-row: 2 / 3;
  column-gap: 0px;
  row-gap: 0px;
  margin: 0px;
  border: none;
  color: #fdba12;
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

const TripName = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 60px 20px;
  font-size: 24px;
  color: white;
  //box-sizing: border-box;
  border: none;
`
const TripDate = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 60px 20px;
  //box-sizing: border-box;
  border-left: solid;
  border-right: solid;
  border-color: #fdba12;
`
const TripDescription = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px;
  padding: 60px 20px;
  color: white;
  box-sizing: border-box;
  border: none;
`
const TextDescription = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 16px;
`

const TripCandidates = styled.div`
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 50px;
  row-gap: 50px;
  margin-left: 1000px;
  padding: 0px;
  color: white;
  box-sizing: border-box;
  border: none;
`
const InfoCandidates = styled.div`
  width: 300px;
  display: flex;
  column-gap: 15px;
  flex-direction: row;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  padding: 0px;
  color: white;
  border: solid;
  border-radius: 5%;
  border-color: #fdba12;
  box-sizing: border-box;
`
const TextCandidates = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 0px;
  //box-sizing: border-box;
  border: none;
`
const IconDate = styled.img`
  width: 1.5vw;
  margin-bottom: 6px;
`

const ButtonCandidates = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border: none;
`
const TripDetailsPage = () => {
  const [trip, setTrip] = useState({});
  const [reload, setReload] = useState(false)
  const history = useHistory();
  const pathParams = useParams();
  const tripId = pathParams.id
  

  useProtectedPage();

  useEffect(() => {
    getTripDetail();
  }, [reload]);

  const getTripDetail = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/trip/${tripId}`,
        {
          headers: {
            auth: localStorage.getItem("token")
          }
        }
      )
      .then((res) => {
        setTrip(res.data.trip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const aproveCandidate = (candidateId) => {
    const body = {
      approve: true
    };
    
    axios
    .put(
      `https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/trips/${tripId}/candidates/${candidateId}/decide`,body,
      {
        headers: {
          auth: localStorage.getItem("token")
        }
      }
    )
      .then((res) => {
        alert("Candidato Aprovado!");
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const denyCandidate = (candidateId) => {
    const body = {
      approve: false
    };
    
    axios
    .put(
      `https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/trips/${tripId}/candidates/${candidateId}/decide`,body,
      {
        headers: {
          auth: localStorage.getItem("token")
        }
      }
    )
      .then((res) => {
        alert("Candidato Rejeitado!");
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
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
          <TextoMenu onClick={logOut}>LOGOUT</TextoMenu>
        </Menu>
      </Header>
      <BodyContainer>
            <TripName>
              {trip.name}
            </TripName>
            <TripDate>
              <IconDate src={DateIcon}></IconDate>
              {trip.date}
            </TripDate>
            <TripDescription>
              <TextDescription>Duração: {trip.durationInDays} dias</TextDescription>
              <TextDescription>Planeta: {trip.planet}</TextDescription>
              <TextDescription>{trip.description}</TextDescription>
            </TripDescription>
            <h1>Candidaturas</h1>
            <TripCandidates>
                {trip.candidates && trip.candidates.map(candidate=>{
                  return  <InfoCandidates>
                        <TextCandidates>
                          <h2>{candidate.name}</h2>
                          <h3>{candidate.age} anos</h3>
                          <p>País de Origem: {candidate.country}</p>
                          <p>Profissão: {candidate.profession}</p>
                          <h3>Por que sou um bom candidato(a)?</h3>
                          <p>{candidate.applicationText}</p>
                        </TextCandidates>
                        <ButtonCandidates>
                          <YellowButton onClick = {() => aproveCandidate(candidate.id)}>Aprovar</YellowButton>
                          <YellowButton onClick = {() => denyCandidate(candidate.id)}>Rejeitar</YellowButton>
                        </ButtonCandidates>                        
                      </InfoCandidates>
            })}
            </TripCandidates>
            
      </BodyContainer>
    </MotherDiv>
  );
};

export default TripDetailsPage;