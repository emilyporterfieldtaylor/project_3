import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './preview.css';

//material ui provided styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'right'
    },
    paperPreview: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginLeft: '0px !important'
    },
    gameImage: {
        width: '100% !important'
    }
}));

function BoardGamePreview(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ marginTop: '20px' }}>
            <Paper className={classes.paperPreview}>
                <div>
                    <h3 style={{ margin: '5px' }}>Board Game Preview: </h3>
                    {props.image ? <img className={classes.gameImage} alt={props.name} src={props.image}></img> : <h5>Sorry, No Image Available</h5>}
                </div>
            </Paper>
        </div>
    )
}

export default BoardGamePreview;