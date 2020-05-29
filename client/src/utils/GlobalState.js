import React, { useContext, useReducer } from "react";
// import { BIconBook } from "bootstrap-vue";

const initialState = {
  savedGames: [],
  currentGame: [],
  userData: [],
  userFriends: [],
  searchFriendArr: [],
  newFriendArr: [],
  clickedFriendArr: [],
  userProfileFriends: [],
  userProfileGames: [],
  externalLinks: [],
  gameCategories: []
};

// Think of this as our main Context API that 
//will server as the Provider and Consumer to 
//handling all our data in our entire application. Global State
const StoreContext = React.createContext();

// Don't forget to import all of your actions!
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_GAME":
      return {
          ...state,
          savedGames: [...state.savedGames]
      }
    case "ADD_USERDATA":
      return {
        ...state,
        userData: action.data
      }
    case "GET_USER_GAMES":
      return {
        ...state,
        savedGames: action.games
      }
    case "GET_USER_FRIENDS":
      return {
        ...state,
        userFriends: action.friends
      }
    case "SEARCH_ALL_FRIENDS":
      return {
        ...state,
        searchFriendArr: action.searchFriend
      }
    case "ADD_FRIEND": 
      return {
        ...state,
        newFriendArr: action.newFriend
      }

    case "GET_CLICKED_FRIEND":
      return {
        ...state,
        clickedFriendArr: action.clickedFriend
      }
    case "USER_PROFILE_FRIENDS":
      return {
        ...state,
        userProfileFriends: [action.friends]
      }
    case "USER_PROFILE_GAMES":
      return {
        ...state,
        userProfileGames: [action.games]
      }
    case 'GET_LINKS':
      return {
        ...state,
        externalLinks: [action.links]
      }
    case 'SEARCH_SAVED_GAMES': 
      return {
        ...state,
        gameCategories: action.games
      }
  
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext }; 