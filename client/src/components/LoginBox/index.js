import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import './loginBox.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    flexGrow: 1,
    fontFamily: 'Pangolin',
    color: 'beige',
    textAlign: 'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "95%",
  }
}));

export default function LoginBox() {
    const [state, dispatch] = useStoreContext();
    let history = useHistory();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormLogin = (e) => {
        const userData = {
            email: values.email,
            password: values.password
        }
        
        API.login(userData).then(results => {
            dispatch({ type: "ADD_USERDATA", data: results.data })
            history.push("/home");
        }).catch(loginError)
    }

    const loginError =() => {
        const userData = {
            email: values.email,
            password: values.password
        }
        if (values.email === "" || values.password === ""){
            alert("Oops your email and/or password are missing");
            return;
        }else if (values !== userData){
            alert("This user does not exist, please create an account");
            return;
        }
    }

    return (
        <div className="main-login">
            <img className="logo" src="/images/ALaBoardLogo1.png" alt="game logo"/>
        <div className="frame-login" >
            <Grid item xs={12}>
                <h2>Welcome, weary travelers.</h2>
                <h2>Fear not, inside are friends</h2>
                <div className={classes.root}>
                    <div>
                        <TextField
                            label="Email"
                            id="filled-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            variant="filled"
                            onChange={handleChange('email')}
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                </div>

                <button type="submit" className="btn" onClick={handleFormLogin}>Login</button>
                <br/>
                
                <a className="google-btn" href="http://localhost:3002/auth/google"><img className="google" src="./images/btn_google_signin_light_pressed_web@2x.png" alt="google-icon" /></a>
                <p>Don't have an account?<Link className="nav" to="/signup">CREATE ONE</Link></p>

            </Grid>
        </div>
        </div>
  );
}

