import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './Auth/Auth';
import history from './history';
// These components which will be created later will serve the various routes below
import Home from './Home/Home'; // The / route
import Profile from './Profile/Profile'; // The /profile route
import Chat from './Chat/Chat'; // The /chat route
import Callback from './Callback/Callback'; // The /callback route


//Instantiate the Auth0 service
const auth = new Auth();
// This function utilizes the handleAuthentication() method in Auth/Auth.js
const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }
  
  // Routes are declared here and also exported for use in other components.
  export const makeMainRoutes = () => {
    return (
      <BrowserRouter history={history} component={App}>
          <div>
            {/* '/' route*/}
            <Route path="/" render={(props) => <App auth={auth} {...props} />} />
            {/* 'Homepage' route*/}
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            {/* 'Chat' route*/}
            <Route path="/chat" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/home"/>
              ) : (
                <Chat auth={auth} {...props} />
              )
            )} />
            {/* 'Profile' route*/}
            <Route path="/profile" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/home"/>
              ) : (
                <Profile auth={auth} {...props} />
              )
            )} />
            {/* 'Callback' route*/}
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>        
          </div>
        </BrowserRouter>
    );
  }