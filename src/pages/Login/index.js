import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import LoginBox from '../../components/LoginBox';
import Grid from '@material-ui/core/Grid';
import './style.css';


function Login() {
  return (
    <div className="loginBox">
        <Paper >
            <LoginBox />
            <div>
                <Link to='/home' style={{textDecoration: 'none'}} className="nav-link homepageLink">To Homepage</Link>
            </div>
        </Paper>
    </div>
  );
}

export default Login;