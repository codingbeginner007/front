import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import "../../css/cv.css";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Socials from "./socials";
import axios from "axios";
import authHeader from "../../services/auth-header";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const About = (props) => {
  // MATERIAL UI STYLING AL3ABD
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(true);
    upload(e);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // DATA TO UPLOAD AL3ABD
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState(0);
  const [social, setSocials] = useState({});

  // RESPONSE MESSAGE AL3ABD
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleNumberChange = (e) => {
    const value = e;
    setNumber(value);
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value);
  };

  const upload = (e) => {
    const fullName = firstName + " " + lastName;
    const socials = JSON.stringify(social);
    axios
      .post(
        "http://localhost:5000/api/cv/about",
        {
          fullName,
          address,
          number,
          bio,
          socials,
        },
        { headers: authHeader() }
      )
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
  };

  return (
    <div>
      <form>
        <div className="form-group" style={{ display: "flex" }}>
          <label for="number" style={{ width: "5vw" }}>
            Full Name:
          </label>
          <input
            class="form-control"
            type="text"
            style={{
              height: "4vh",
              width: "20vw",
              marginLeft: "3vw",
              backgroundColor: "#f3f2ef",
            }}
            placeholder="First Name"
            value={firstName
              .split(" ")
              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
              .join(" ")}
            onChange={handleFirstNameChange}
            required
          />
          <input
            class="form-control"
            type="text"
            id="number"
            style={{
              height: "4vh",
              width: "20vw",
              marginLeft: "3vw",
              backgroundColor: "#f3f2ef",
            }}
            placeholder="Last Name"
            value={lastName
              .split(" ")
              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
              .join(" ")}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="form-group" style={{ display: "flex" }}>
          <label for="number" style={{ width: "5vw" }}>
            Address:
          </label>
          <input
            class="form-control"
            type="text"
            placeholder="Address"
            style={{
              height: "4vh",
              width: "43vw",
              marginLeft: "3vw",
              backgroundColor: "#f3f2ef",
            }}
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div className="form-group" style={{ display: "flex" }}>
          <label for="number" style={{ width: "5vw" }}>
            Phone:
          </label>
          <br />
          <Input
            country="MA"
            value={number}
            placeholder="Phone Number"
            onChange={handleNumberChange}
            style={{
              height: "4vh",
              width: "10vw",
              marginLeft: "3vw",
              backgroundColor: "#f3f2ef",
              border: "1px solid #b3b3b3",
              padding: "1vh 1vw",
            }}
          />
        </div>
        <div class="form-group">
          <label for="bio" style={{ width: "5vw" }}>
            Bio:
          </label>
          <br />
          <textarea
            class="form-control"
            rows="4"
            name="bio"
            id="comment"
            className="inputs"
            maxLength="400"
            placeholder="Bio"
            style={{
              width: "51vw",
              backgroundColor: "#f3f2ef",
              resize: "none",
            }}
            value={bio}
            onChange={handleBioChange}
          ></textarea>
        </div>
        <div class="form-group" style={{ display: "flex" }}>
          <Socials onChange={(value) => setSocials(value)} />
        </div>
        <div className={classes.root + " btnholder"}>
          <Button
            variant="outlined"
            onClick={(e) => {
              props.onChange(true);
              handleClick();
            }}
          >
            UPLOAD
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={successful ? "success" : "error"}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
};
export default About;
