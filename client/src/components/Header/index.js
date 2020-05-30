import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AuthManager from "../../utils/AuthManager";
import { useStoreContext } from '../../utils/GlobalState';
import './header.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    loggedIn: {
        flexGrow: 1,
    },
    logout: {
        color: 'white',
        textAlign: 'left'
    }
}));

export default function Header() {
    const [state, dispatch] = useStoreContext();
    const classes = useStyles();
    const { user: auth2, logout } = AuthManager();
    //const [auth2, setAuth2] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        logout();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <img className="logo-two" src="/images/ALaBoardLogo1NameLong.png" alt="logo" />
                    </Typography>

                    {auth2 && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Typography variant="subtitle2" className={classes.loggedIn}>
                                Logged in as {auth2.name}!
                            </Typography>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={auth2} onChange={handleChange} aria-label="login switch" />}
                            label={auth2 ? 'Logout' : 'Login'}
                        />
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </div>
    )
}

