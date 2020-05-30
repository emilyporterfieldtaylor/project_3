import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import './signup.css';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';

//material ui code for input boxes
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '95%',
    },
}));

export default function SignupForm() {
    const [state, dispatch] = useStoreContext();
    let history = useHistory();

    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        name: '',
        email: '',
        password: '',
        weight: '',
        showPassword: false,
        weightRange: '',
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

    //when signup button is clicked, post request made to input user into database
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        if (values.password.length < 8) {
            alert("Passwords must be at lease 8 characters")
        } else {
            API.signup(userData).then(results => {
                { dispatch({ type: "ADD_USERDATA", data: results.data }) }
                history.push("/hotitems");
            }).catch(loginError)
        }

    }

    //validation, missing info/user already created
    const loginError = () => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        if (values.email === "" || values.name === "" || values.password === "") {
            alert('Oops one of the fields was left blank, please fully complete form.');
        } else if (values.email === values.email) {
            alert("User already exists, use login page to continue");
        }
    }

    return (
        <div className="signup-main">
            <img className="logo" src="/images/ALaBoardLogo1.png" alt="game logo" />
            <div className="signup-frame">
                <Grid item xs={12}>
                    <h2 className="signup-h2">Join the party!</h2>
                    <div className={classes.root}>
                        <div>
                            <TextField
                                label="Full Name"
                                id="filled-start-adornment"
                                className={clsx(classes.margin, classes.textField)}
                                variant="filled"
                                onChange={handleChange('name')}
                            />
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
                    <button type="submit" className="btn btn-default" onClick={handleFormSubmit}><a href="/hotitems" >Sign Up</a></button>
                    <br />
                    <p>Already have an account?<Link className="login-link" to="/login"> LOGIN </Link></p>
                </Grid>
            </div>
        </div>
    )
};
