import React from 'react';
import Grid from '@material-ui/core/Grid';
import './style.css';

export default function Signup() {
    return(
      
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
                    <br/>
                    <button type='sumbit'>Log In</button> 

                    <p>Signup</p>   
                </Grid>
            </div>
        </div>
        
    )
};

