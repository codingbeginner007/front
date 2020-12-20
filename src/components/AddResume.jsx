import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//CHILDREN
import Image from "./AddResume Children/Image";
import About from "./AddResume Children/About";
import Experiences from "./AddResume Children/Experiences";
import Education from "./AddResume Children/Education";

import "../css/cv.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "90% !important",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "auto",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
const steps = [
  "Photo",
  "About",
  "Experience",
  "Education",
  "Skill",
  "Interests",
  "Awards",
];

export default function AddResume() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [toggle, setToggle] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Image
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 1:
        return (
          <About
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 2:
        return <Experiences />;
      case 3:
        return <Education />;
      case 4:
        return <div>item5</div>;
      case 5:
        return <div>item6</div>;
      case 6:
        return <div>item6</div>;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Resume Generator
          </Typography>
          <div className="d-flex flex-wrap">
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.stepper}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <div className="flex-fill mt-4 ml-4">
                    <Typography variant="h5" gutterBottom>
                      Thank you for your Time.
                    </Typography>
                  </div>

                  <Typography variant="subtitle1">
                    Your resume is now accessible to everyone. We have emailed
                    your resume, and will send you an update when any company
                    want to contact you.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="flex-fill mt-4 ml-4 bruh">
                    {getStepContent(activeStep)}
                  </div>
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!toggle}
                      onClick={() => {
                        handleNext();
                        setToggle(false);
                      }}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Confirmer" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
