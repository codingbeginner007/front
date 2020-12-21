import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddResume from "./components/AddResume";
import "./App.js";

const App = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{ margin: 0, padding: 0, width: "100%" }}
        className="container-fluid"
      >
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile2" component={Profile} />
          <Route exact path="/profile" component={AddResume} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
