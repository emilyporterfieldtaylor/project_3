import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HotItems from './pages/HotItems';
import Signup from './pages/Signup';
import userProfile from './pages/UserProfile';
import { StoreProvider } from './utils/GlobalState';
import SearchFriendsPage from './pages/SearchFriendsPage';
import PlanEvent from './pages/PlanEvent';
import Footer from './components/Footer';


export default function App() {
  return (
    <Router>
      <StoreProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/hotitems" component={HotItems} />
          <Route path="/users" component={userProfile} />
          <Route path="/search_friends" component={SearchFriendsPage} />
          <Route path="/planmyevent" component={PlanEvent} />
        </Switch>
        <Footer />
      </StoreProvider>
    </Router>
  );
};

