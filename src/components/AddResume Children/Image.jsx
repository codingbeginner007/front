import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import "../../css/cv.css";

import "react-phone-number-input/style.css";

import { post } from "axios";

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

// import CvService from '/Users/Bobbhy/Documents/React/front/src/services/cv.service';

const Image = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    setOpen(true);
    fileUpload();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const onChange = (e) => {
    const myRenamedFile = new File(
      [e.target.files[0]],
      user.accessToken.split(".")[1] + "." + e.target.files[0].split("/")[1]
    );
    setFile(myRenamedFile);
    console.log(file);

    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      console.log(img);
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const fileUpload = () => {
    const url = "http://localhost:5000/api/cv/image";
    const formData = new FormData();
    formData.append("file", file);
    let value = "Bearer " + user?.accessToken;
    console.log(formData);
    const config = {
      headers: {
        Authorization: value,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config).then(
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
  // const fileUpload = (e) => {
  //   const url = "http://localhost:5000/api/cv/image";
  //   const formData = new FormData();

  //   formData.append("file", file);
  //   let value = "Bearer " + user?.accessToken;
  //   console.log(value);
  //   const config = {
  //     headers: {
  //       Authorization: value,
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  return (
    <form>
      <h1>File Upload</h1>
      {image && (
        <div>
          <img
            src={image}
            style={{ maxHeight: "35vh", maxWidth: "30vw" }}
            alt="votre image"
          />
        </div>
      )}
      <label for="file-upload" className="custom-file-upload">
        <i class="fas fa-upload"></i>Choose File
      </label>
      <input
        type="file"
        id="file-upload"
        accept=".jpeg,.png,.jpg,.tif,.svg"
        onChange={onChange}
      />
      <div className={classes.root + " btnholder"}>
        <Button
          variant="outlined"
          onClick={(e) => {
            props.onChange(true);
            handleClick(e);
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
  );
};
export default Image;
