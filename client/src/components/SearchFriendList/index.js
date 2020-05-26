import React, { useState, useEffect } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
    },
    li: {
        textAlign: 'center',
        color: 'darkred',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        listStyleType: 'none',
        borderBottom: '1px solid black'
    },
    button: {
        margin: '10px'
    },
    searchFriendList: {
        fontSize: '10px'
    },
    header : {
        color: 'salmon',
        textAlign: 'center'
    }
}));


function SearchFriendList(props) {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();

    const [searchedFor, setSearchedFor] = useState([]);
    // const [games, setGames] = useState([]);
    // const [query, setQuery] = useState('catan');
    // const [search, setSearch] = useState('');
    // const [friendarr, setFriend] = useState({});

    useEffect(() => {
        console.log('sate: ',state.searchFriendArr)
        searchFriends();
    }, []);

    function searchFriends() {
        API.searchFriends().then(results => {
            console.log("search friends : ", results.data)
            dispatch({type: "SEARCH_ALL_FRIENDS", searchFriend: results.data})
        })
    }

    function addFriend(friend) {
        let friendData = {
            name: friend
        }
        API.addFriend(friendData)
        .then(res => {
            console.log('sate: ',state.searchFriendArr)

            dispatch({type: "ADD_FRIEND", newFriend: res.data})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>Search For New Friends!</h1>
            <Paper className={classes.paper}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                   /*  options = {
                        state.searchFriendArr.map(friend => friend.name)
                    } */
                    renderInput={(params) => (
                    <TextField
                        className={classes.searchFriendList}
                        {...params}
                        label="Search Friend List"
                        // margin="normal"
                        variant="outlined"
                        // value={query}
                        onChange = { 
                            event => {
                                // setQuery(event.target.value);
                                setSearchedFor(event.target.value)
                            }
                        }
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                {/* {state.searchedFor.map(friend =>  (
                    <li 
                    key={friend.name}
                    className={classes.li}
                    value={friend.name}
                    >
                        {friend.name}
                        <button 
                            className={classes.button}
                            onClick={() =>  {
                                // setFriend(friend.name);
                                addFriend(friend.name);
                                }
                            }   
                        >
                           <i className="fas fa-user-plus"></i>   Add Friend
                        </button>    
                    </li>

                ))} */}
                
            </Paper>
        </div>
    )
}

export default SearchFriendList;

// ==========================

//     function addFriend(friend) {
//         let friendData = {
//             name: friend
//         }
//         API.addFriend(friendData)
//         .then(res => {
//             dispatch({type: "ADD_FRIEND", newFriend: res.data})
//         })
//         .catch(err => console.log(err))
//     }

//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 {/* {state.searchFriendArr ? ( */}
//                     <div>
//                     {state.searchFriendArr.map(friend => (
//                         <div>
//                         <Autocomplete
//                             freeSolo
//                             id="free-solo-2-demo"
//                             disableClearable
//                             // options= {friendsList.map((option) => option.title)}
//                             options = {
//                                 state.searchFriendArr.map(friend => friend.name)
//                             }
//                             renderInput={(params) => (
//                             <TextField
//                                 className={classes.searchFriendList}
//                                 {...params}
//                                 label="Search Friend List"
//                                 // margin="normal"
//                                 variant="outlined"
//                                 // value={query}
//                                 // onChange = { 
//                                 //     event => {
//                                 //         setQuery(event.target.value);
//                                 //         setSearchedFor(event.target.value)
//                                 //     }
//                                 // }
//                                 InputProps={{ ...params.InputProps, type: 'search' }}
//                             />
//                             )}
//                         />
//                         <button 
//                             type="button"
//                             value={friend.name}
//                             onClick={() =>  {
//                                 // searchFriends();
//                                 // setSearch(query);
//                                 addFriend(this.value);
//                                 }
//                             }
//                         >
//                             Add Friend
//                         </button> 
//                         </div>
//                     ))}
//                 </div>
//                 )
//                  {/* :
//                 (
//                     <div></div>
//                 )} */}
//             </Paper>

                
            
// {/*     
//                 {state.searchFriendArr.map(friend =>  (
//                     <li value={friend.name}>
//                         {friend.name}
//                         <button 
//                             onClick={() =>  {
//                                 // setFriend(friend.name);
//                                 addFriend(friend.name);
//                                 }
//                             }   
//                         >
//                             Add Friend
//                         </button>    
//                     </li>

//                 ))} */}
//         </div>
//     )
// }

// export default SearchFriendList;