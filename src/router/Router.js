import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../componentes/HomePage";
import LoginPage from "../componentes/LoginPage";
import ListTripsPage from "../componentes/ListTripsPage";
import TripDetailsPage from "../componentes/TripDetailsPage";
import CreateTripPage from "../componentes/CreateTripPage";
import CandidateFormPage from "../componentes/CandidateFormPage";
import ErrorPage from "../componentes/ErrorPage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path={"/candidate/:id"}>
          <CandidateFormPage />
        </Route>
        <Route exact path={"/trips/list"}>
          <ListTripsPage />
        </Route>
        <Route exact path={"/trips/:id"}>
          <TripDetailsPage />
        </Route>
        <Route exact path={"/createtrip"}>
          <CreateTripPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;