import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import { Link } from 'react-router-dom';
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
        marginBottom: '10px',
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

function Header() {  
    const classes = useStyles();
    const {user: auth, logout} = AuthManager();
    const [anchorEl, setAnchorEl] = React.useState(null);

    //console.log(state)

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
                        <img className="logo-two" src="/images/ALaBoardLogo1.png"/>
                    </Typography>

                    {auth && (
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

<<<<<<< HEAD
                            <Typography variant="subtitle2" className={classes.loggedIn}>
                                Logged in as {auth.name}!
=======
                            <Typography  variant="subtitle2" className={classes.loggedIn}>
                                Logged in as {state.userData.name}!
>>>>>>> 837cc8d191f9498173ad7211bef8213ff6832c69
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
                            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                            label={auth ? 'Logout' : 'Login'}
                        />
                        {/* {!auth && (
                                <Typography className={classes.logout}>Log In</Typography>
                            )} */}
                        {/* {auth && (
                                <Typography className={classes.logout}>Log Out</Typography>
                            )} */}
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;