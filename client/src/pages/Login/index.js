import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import LoginBox from '../../components/LoginBox';
// import Grid from '@material-ui/core/Grid';
import './style.css';
import LoginBanner from '../../components/LoginBanner';
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

function Login() {
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
    <div>
        <LoginBanner />

      <div class="frame-two">
              {/* <LoginBanner /> */}

              <Grid item xs={12}>
                  <h2>Log In</h2>
                  <div className={classes.root}>
                      <div>
                          <TextField
                              label="username"
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

                  <button type="submit" class="btn btn-default"><Link to='/home'>Log In</Link></button>
                  <br />
                  <p>Heads up Back-end: Login button will auto-direct to '/home' without putting anything in.</p>
              </Grid>
          </div>
        </div>

  )





  // return (
  //   <div>
  //       <div className="loginBox">
  //           <Paper >
  //               <LoginBox />
  //               <div>
  //                   <Link to='/home' style={{textDecoration: 'none'}} className="nav-link homepageLink">To Homepage (Remove once 'login' button works!)</Link>
  //               </div>
  //           </Paper>
  //       </div>
  //   </div>
  // );
}

export default Login;