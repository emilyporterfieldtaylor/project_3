import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import API from "./index";
import { useStoreContext } from "./GlobalState";

export default function AuthManager()  {
    const history = useHistory();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        if (await isUserLoggedIn() && state.userData) {
            try {
                const user = await API.userData();
                dispatch({ type: "ADD_USERDATA", data: user.data });
            } catch (error) {
                console.log("Error With User Data API", error);
            }
        } else {
            history.push("/");
        }
    }

    const isUserLoggedIn = () => {
        const userLoggedIn = Cookies.get('logged_in')
        if (userLoggedIn === undefined || userLoggedIn === "") return false;
        return true
    }

    const handleLogout = async () => {     
        try {
            await API.logout();
        } catch (error) {
            console.log("issue with logging out on server", error);
        }
        dispatch({ type: "LOGOUT" });
        history.push("/");
    }

    return {
        user: state.userData || undefined,
        logout: handleLogout
    }
};

