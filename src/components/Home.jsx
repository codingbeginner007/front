import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
//Materiel Ui
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const Home = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await UserService.getApiState().then(
        (response) => {
          setContent(response.data);
          setSuccess(true);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setError(_content);
        }
      );
    }
    // Execute the created function directly
    anyNameFunction();
  }, []);
  if (success)
    if (content) {
      return (
        <div className={classes.root}>
          <AppBar position="static" color="whitesmoke">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab
                label="Accueil"
                {...a11yProps(0)}
                style={{ outline: "none" }}
              />
              <Tab
                label="Formules"
                {...a11yProps(1)}
                style={{ outline: "none" }}
              />
              <Tab
                label="Formations"
                {...a11yProps(2)}
                style={{ outline: "none" }}
              />
              <Tab
                label="Participants 2019"
                {...a11yProps(3)}
                style={{ outline: "none" }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </div>
      );
    }
  if (error) {
    return (
      <div className="alert alert-danger mt-3">{error || error?.error}</div>
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
export default Home;
