import { Router } from "@reach/router";
import React from "react";
import "./App.css";
import Actions from "./components/Actions";
import Home from "./components/Home";
import Success from "./components/Success";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Actions path="/actions/:id" />
      <Success path="/success/" />
    </Router>
  );
}

export default App;
