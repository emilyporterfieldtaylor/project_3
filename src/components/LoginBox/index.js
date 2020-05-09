import React from 'react';
import Grid from '@material-ui/core/Grid';
import './style.css';

function LoginBox() {
    return (
        <div class="outer-wrapper">
            <div class="frame">
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
                        Submit
                    </button>    
                </Grid>
            </div>
        </div>
    );
}

export default LoginBox;