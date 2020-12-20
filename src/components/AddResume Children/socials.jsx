import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";

const Socials = (props) => {
  const [id, setId] = useState("");
  const [toggle, setToggle] = useState(false);
  const [socials, setSocials] = useState({});

  const fbToggler = (e) => {
    if (toggle == false) {
      setToggle(true);
      setId("Facebook");
    } else {
      setToggle(false);
    }
  };

  const inToggler = (e) => {
    if (toggle == false) {
      setToggle(true);
      setId("LinkedIn");
    } else {
      setToggle(false);
    }
  };

  const gitToggler = (e) => {
    if (toggle == false) {
      setToggle(true);
      setId("GitHub");
    } else {
      setToggle(false);
    }
  };

  const close = () => {
    setToggle(false);
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (e.target.id == "Facebook") {
      setSocials({ ...socials, Facebook: value });
    } else if (e.target.id == "LinkedIn") {
      setSocials({ ...socials, LinkedIn: value });
    } else if (e.target.id == "GitHub") {
      setSocials({ ...socials, GitHub: value });
    }
  };

  return (
    <div>
      <div class="form-group" style={{ display: "flex" }}>
        <label style={{ width: "20vw" }}>Add Socials:</label>
        <MDBContainer style={{ marginLeft: "10vw" }}>
          <MDBBtn size="lg" social="fb" onClick={fbToggler}>
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn size="lg" social="li" onClick={inToggler}>
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn size="lg" social="git" onClick={gitToggler}>
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </MDBContainer>
      </div>
      {toggle && (
        <div class="form-group" style={{ display: "flex" }}>
          {id && (
            <input
              class="form-control"
              type="text"
              placeholder={`${id} Profile Link`}
              style={{ width: "40vw", backgroundColor: "#f3f2ef" }}
              id={id}
              value={socials[id]}
              onChange={onChangeHandler}
              required
            />
          )}
          <Button
            variant="contained"
            color="info"
            style={{ marginLeft: "3px", fontWeight: "bolder" }}
            onClick={(event) => {
              props.onChange(socials);
              close();
            }}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};
export default Socials;
