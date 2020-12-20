import React, { initialState, useState, useEffect } from "react";
import Cv from "./Cv";
import AddResume from "./AddResume";
import UserService from "../services/user.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/profile.css";

const Profile = () => {
  const [cv, setCv] = useState(initialState);
  const [error, setError] = useState();
  const [hidden, setHidden] = useState(true);

  if (!hidden) {
    if (cv === undefined) {
      return (
        <div>
          <AddResume />
        </div>
      );
    } else {
      return (
        <div className="body">
          <Cv />
        </div>
      );
    }
  } else if (error === "Network Error")
    return (
      <div className="mt-3 ml-5 mt-3 ml-5 mr-5 text-center alert alert-danger">
        Network Error
      </div>
    );
  if (error !== "Network Error" && error) {
    if (!localStorage.getItem("user"))
      return (
        <div className="mt-3 ml-5 mr-5 text-center alert alert-danger">
          Login first to see your profile
        </div>
      );
    else
      return (
        <div className="alert mt-3 ml-5 mr-5  alert-danger">
          Stop being cocky fuck off on my website
        </div>
      );
  }

  return (
    <div>
      <div className="loader">
        <div className="material-spinner"></div>
        Loading...
      </div>
    </div>
  );
};
export default Profile;
