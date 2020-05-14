import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './style.css';

function LoginBox() {
    return (
        <div className="outer-wrapper">
            <div className="frame">
                <Grid item xs={12}>
                    <input 
                        type='text' 
                        value='username'
                        placeholder='username'
                    />
                    <input 
                        type='text' 
                        value='password'
                        placeholder='password'
                    />
                    <br/>
                    <button className="btn" type='submit'>Log In</button> 
               
                    <Link className="nav" to="/signup">Signup</Link>
                </Grid>
            </div>
        </div>
    );
}

export default LoginBox;