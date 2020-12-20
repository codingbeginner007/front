import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Create an scoped async function in the hook
        async function check() {
            await UserService.getUserData().then(
                (response) => {
                    setCurrentUser(response);
                    setSuccess(true);

                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setError(_content);
                    console.log(error);
                    setSuccess(true);

                }
            )
        }
        // Execute the created function directly
        check();
    }, []);

    if (success) {
        if (error) {
            if (localStorage.getItem('user')) {
                setTimeout(() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                }, 5000)
                return <div className="mx-auto col-md-6 mt-5 alert alert-danger">Stop being cocky dont touch my website!</div>
            }
            else {
                return (
                    <div >
                        {loading && <div className={classes.root}>
                            <LinearProgress />
                        </div>}
                        <Form onSubmit={handleLogin} ref={form} className="col-md-5 mx-auto mt-5">
                            <h3>Sign In</h3>
                            <div className="form-group">
                                <label>Email address (Or Username)</label>
                                <Input type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required]} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <Input type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block" disabled={loading}>
                                <span> Login</span></button>
                            <p className="forgot-password text-right">
                                Forgot <a href="/signup">password?</a>
                            </p>
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message || ("Username or password are incorrect")}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                );
            }

        }
        else
            return <div className="mx-auto col-md-6 mt-5 alert alert-info">You are already logged in {currentUser?.data?.username}</div>

    }
    return (
        <div >
            <div className="loader">
                <div className="material-spinner"></div>
            Loading...
         </div>
        </div>);
}

export default Login;