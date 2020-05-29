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
        if(await isUserLoggedIn() && state.userData.length === 0) {
            try {
                const user = await API.userData();
                console.log(user.data)
                dispatch({type: "ADD_USERDATA", data: [...user.data]});
                if(await isFirstLog()) {
                  history.push("/hotitems")
                } else {
                  history.push("/home")
                }
                // history.push("/home");
            } catch (error) {
                console.log("Error With User Data API", error);
            }
        } else {
            console.log("your not logged in");
            history.push("/");
        }
    }

    const isUserLoggedIn = () => {
        const userLoggedIn =  Cookies.get('logged_in')
        if (userLoggedIn === undefined || userLoggedIn === "") return false;
        return true
    }
    const isFirstLog =  () => {
      const userLoggedIn =  Cookies.get('first_log')
      if (userLoggedIn === undefined || userLoggedIn === "") return false;
      return true
    }

    const handleLogout = async () => {
        console.log("logging out");
        try {
            await API.logout();
        } catch(error) {
            console.log("issue with logging out on server", error);
        }
        dispatch({type: "LOGOUT"});
        history.push("/");
    }

    return {
        user: state.userData[0] || [],
        logout: handleLogout
    }
}

export default AuthManager;