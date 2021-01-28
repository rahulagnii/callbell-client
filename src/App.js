import { Router } from "@reach/router";
import React from "react";
import "./App.css";
import Actions from "./components/Actions";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Actions path="/actions/:id" />
    </Router>
  );
}

export default App;
