import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import Logo from './img/logo.svg';
import DateIcon from './img/calendario.svg';

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
  box-sizing: border-box;
  justify-items: center;
  grid-template-columns: 25% 25% 25% 25%;
  grid-row: 2 / 3;
  column-gap: 0px;
  row-gap: 20px;
  margin: 0px;
  padding-top: 20px;
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

const ListTrips = styled.div`
  width: 15vw;
  height: 50vh;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #22252a;
  border-radius: 5%;
  border: none;
`
const TripName = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 0px;
  padding: 0px;
  color: white;
  box-sizing: border-box;
  border: none;
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border: none;
`
const IconDate = styled.img`
  width: 1.5vw;
  margin-bottom: 2px;
`

const TripDate = styled.div`
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border: none;
`
const TripDescription = styled.div`
  grid-row: 3 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  color: white;
  box-sizing: border-box;
  border: none;
`
const ButtonDiv = styled.div`
  grid-row: 4 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border: none;
`

const ListTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const history = useHistory();
  const pathParams = useParams();
  
  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/daltro-dumont/trips",
      )
      .then((res) => {
        setTrips(res.data.trips);
  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToTripDetailsPage = (id) => {
    console.log(id);
    history.push(`/trips/${id}`);
  };

  const goToCreateTripPage = () => {
    history.push("/createtrip");
  };

  const goToHomePage = () => {
    history.push("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <MotherDiv>
      <Header>
        <LogoContainer>
          <img src={Logo}></img>
        </LogoContainer>
        <Menu>
          <TextoMenu onClick={goToHomePage}>HOME</TextoMenu>
          <TextoMenu onClick={goToCreateTripPage}>CRIAR VIAGENS</TextoMenu>
          <TextoMenu onClick={logOut}>LOGOUT</TextoMenu>
        </Menu>
      </Header>
      <BodyContainer>
          {trips.map((trip) => {
              return <ListTrips>
                      <TripName>{trip.name}</TripName>
                      <DateContainer>
                      <IconDate src={DateIcon}></IconDate>
                      <TripDate>{trip.date}</TripDate>
                      </DateContainer>
                      <TripDescription>Descrição: {trip.description}</TripDescription>
                      <ButtonDiv>
                        <YellowButton onClick = {() => goToTripDetailsPage(trip.id)}>Ver Detalhes</YellowButton>
                      </ButtonDiv>
                    </ListTrips>       
          })}
      </BodyContainer>

    </MotherDiv>
  );
};

export default ListTripsPage;