import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useStoreContext } from '../../utils/GlobalState';
import './external.css';

// material ui provided styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperLinks: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        fontFamily: 'Pangolin',
        marginLeft: '1rem !important',
        marginRight: '1rem !important',
    },
    hiddenLi: {
        listStyleType: 'none'
    },
    aDiv: {

    },
    aTag: {
        width: '150px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    }
}));

export default function Links() {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();

    let gameId;
    let replaceSpace;

    return (
        <div className={classes.root} style={{ marginTop: '20px' }}>
            <Paper id="buy" className={classes.paperLinks}>
                <div>
                    <u>Want to buy it?</u>
                    {state.externalLinks.length ? (
                        gameId = state.externalLinks[0].name,
                        replaceSpace = gameId.replace(/\s/g, "+"),
                            <div className={classes.aDiv}>
                                <a className={classes.aTag} target="_blank" href={`https://www.amazon.com/s?k=${replaceSpace}`}>https://www.amazon.com/s?k={replaceSpace}</a>
                            </div>
                    ) : (
                        <li className={classes.hiddenLi}></li>
                    )}
                </div>
            </Paper>
        </div>
    )
}
