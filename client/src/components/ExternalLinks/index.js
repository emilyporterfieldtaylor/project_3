import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useStoreContext } from '../../utils/GlobalState';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      fontFamily: 'Pangolin',
      marginLeft: '1rem !important',
      marginRight: '1rem !important',
    },
    externalLinks: {
        padding: '5px'
    },
    hiddenLi: {
        listStyleType: 'none'
    }
}));

function Links() {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();

    let gameId;
    let replaceSpace; 

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                Want to buy it?
                <ul className={classes.externalLinks}>
                    
                    {state.externalLinks.length ? (
                        gameId = state.externalLinks[0].name,
                        replaceSpace = gameId.replace(/\s/g, "+"),
                        
                        <a target="_blank" href={`https://www.amazon.com/s?k=${replaceSpace}`}>https://www.amazon.com/s?k={replaceSpace}</a>
                    ) : (
                        <li className={classes.hiddenLi}></li>
                    )}
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                </ul>    
            </Paper>
        </div>
    )
}

export default Links;