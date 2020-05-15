import React from 'react';
import { Link } from 'react-router-dom';
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
import './style.css';

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
        width: '25ch',
    },
}));


export default function Signup() {

    const classes = useStyles();
    const [values, setValues] = React.useState({
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

    return (
        <div class="frame-two">
            <Grid item xs={12}>
                <h2>Sign Up</h2>
                <div className={classes.root}>
                    <div>
                        <TextField
                            label="Full Name"
                            id="filled-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            variant="filled"
                        />
                        <TextField
                            label="Email"
                            id="filled-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            variant="filled"
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
                {/* remove this p tag once button is working with database */}
                <p>for right now this button goes back to login page with out sending info to database</p>

                <button type="submit" class="btn btn-default"><Link class="login-link" to="/login">Sign Up</Link></button>
                <br />
                <p>Login<Link class="login-link" to="/login"> Here </Link></p>
            </Grid>
        </div>
    )
};



