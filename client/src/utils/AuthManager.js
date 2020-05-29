import React, {useEffect} from "react";
import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom";
import API from "./index";
import { useStoreContext } from "./GlobalState";


const AuthManager = () => {
    const history = useHistory();
    const [state, dispatch] = useStoreContext();

    useEffect(() => { 
        loadUserData();
    }, []);

    const loadUserData = async () => {
        if(await isUserLoggedIn() && !state.userData.name) {
            /*
                This occurs when session on server have user logged in,
                But we havent set the global state of userData yet. The
                following code will proceed to set.
            */

            try {
                const user = await API.userData();

                if(!user.data.name) {
                    Cookies.remove("logged_in");
                    return history.push("/");
                }

                dispatch({type: "ADD_USERDATA", data: user.data});
                navigateUser(user.data.firstTimeLogin);
            } catch (error) {
                console.log("Error With User Data API", error);
            }
        } else if(state.userData.name) { 
            // User is logged in and we have their userData stored in state. Lets redirect them where they need to go at this point
            navigateUser(state.userData.firstTimeLogin);
        } else {
            console.log("your not logged in");
            history.push("/");
        }
    }

    const navigateUser = (isFirstTimeLogin) => {
        // if user 1st time login send them to hotitems page
        if(isFirstTimeLogin) return history.push("/hotitems")
        history.push("/home");
    }

    const isUserLoggedIn = () => {
        const userLoggedIn =  Cookies.get('logged_in')
        if (userLoggedIn === undefined || userLoggedIn === "") return false;
        return true
    }

    const handleLogout = async () => {
        console.log("logging out");
        try {
            await API.logout();
            dispatch({type: "LOGOUT"});
        } catch(error) {
            console.log("issue with logging out on server", error);
        }
        dispatch({type: "LOGOUT"});
        history.push("/");
    }

    return {
        user: state.userData || {},
        logout: handleLogout
    }
}

export default AuthManager;