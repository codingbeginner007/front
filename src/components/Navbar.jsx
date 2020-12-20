import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../App.css";

//NAVBAR STYLING AND BUTTONS

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  menuButton: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItemsLogged = [
    {
      menuTitle: "Profile",
      pageURL: "/profile",
    },
    {
      menuTitle: "Log Out",
      pageURL: "/logout",
    },
  ];

  const menuItemsNotLogged = [
    {
      menuTitle: "Log In",
      pageURL: "/login",
    },
    {
      menuTitle: "Sign Up",
      pageURL: "/register",
    },
  ];

  //LOGIC

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    history.push("/");
    window.location.reload();
  };
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          {/* <Typography variant="h6" className={classes.title}>
            LOGO
          </Typography> */}
          <Button
            onClick={() => handleButtonClick("/")}
            style={{
              "background-color": "inherit",
              color: "white",
              "font-weight": "bold",
              "font-size": "25px",
              "letter-spacing": "2px",
            }}
          >
            LOGO
          </Button>
          {isMobile ? (
            <>
              <p
                style={{ color: "#3F51B5", p: "20px" }}
                className="unselectable"
              >
                hello my name is gopnyk krocuzatic im from moroccoOo
              </p>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {currentUser
                  ? menuItemsLogged.map((menuItem) => {
                      const { menuTitle, pageURL } = menuItem;
                      return menuItem.menuTitle === "Log Out" ? (
                        <MenuItem onClick={logOut}>{menuTitle}</MenuItem>
                      ) : (
                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                          {menuTitle}
                        </MenuItem>
                      );
                    })
                  : menuItemsNotLogged.map((menuItem) => {
                      const { menuTitle, pageURL } = menuItem;
                      return (
                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                          {menuTitle}
                        </MenuItem>
                      );
                    })}
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              {currentUser && (
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/profile")}
                  style={{
                    background: "none",
                    boxShadow: "none",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                >
                  PROFILE
                </Button>
              )}
              {currentUser && (
                <Button
                  variant="contained"
                  onClick={logOut}
                  style={{
                    marginLeft: "15px",
                    background: "none",
                    boxShadow: "none",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                >
                  LOGOUT
                </Button>
              )}
              {!currentUser && (
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/login", true)}
                  style={{
                    marginLeft: "15px",
                    background: "none",
                    boxShadow: "none",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                >
                  LOG IN
                </Button>
              )}
              {!currentUser && (
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick("/register")}
                  style={{ marginLeft: "15px" }}
                  style={{
                    marginLeft: "15px",
                    background: "none",
                    boxShadow: "none",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                    outline: "none",
                  }}
                >
                  REGISTER
                </Button>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
