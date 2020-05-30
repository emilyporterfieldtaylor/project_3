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
        width: '40%',
        height: 'auto'
    }
}));

export default function BoardGamePreview(props) {
    const classes = useStyles();

    return (
        <div id="paper-view" className={classes.root}>
            <Paper className={classes.paperPreview}>
                <div>
                    <h3>Board Game Preview </h3>
                    {props.image ? <img className={classes.gameImage} alt={props.name} src={props.image}></img> : <h5>Sorry, No Image Available</h5>}
                </div>
            </Paper>
        </div>
    )
}

