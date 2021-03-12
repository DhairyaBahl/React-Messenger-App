import React, { useState } from "react";
import "./App.css";
import Sideroom from "./components/Sideroom";
import Chatroom from "./components/Chatroom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
         
          <Router>
            
            <Sideroom />
            <Switch>
              <Route path="/rooms/:roomid">
               
                <Chatroom />
              </Route>
              <Route path="/">
                <Chatroom />
             
              </Route>
            </Switch>
          </Router>
         
        </div>
      )}
    </div>
  );
}

export default App;
