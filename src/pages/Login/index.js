import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Paper>
        Nothing here quite yet!
        <Link to='/home' style={{textDecoration: 'none'}} className="nav-link">To Homepage</Link>
    </Paper>
  );
}

export default App;