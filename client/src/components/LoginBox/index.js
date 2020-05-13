import React from 'react';
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
                    <br></br>
                    <button
                        type='sumbit'
                    >
                        Log In
                    </button>    
                </Grid>
            </div>
        </div>
    );
}

export default LoginBox;