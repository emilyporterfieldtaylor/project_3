import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import LoginBox from '../../components/LoginBox';
// import Grid from '@material-ui/core/Grid';
import './style.css';
import LoginBanner from '../../components/LoginBanner';


function Login() {
  return (
    <div>
        <LoginBanner />
        <div className="loginBox">
            <Paper >
                <LoginBox />
                <div>
                    <Link to='/home' style={{textDecoration: 'none'}} className="nav-link homepageLink">To Homepage (Remove once 'login' button works!)</Link>
                </div>
            </Paper>
        </div>
    </div>
  );
}

export default Login;