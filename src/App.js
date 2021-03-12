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
          {/* <div className="app__backgroundpart"> */}
          <Router>
            {/* sidebar */}
            <Sideroom />
            <Switch>
              <Route path="/rooms/:roomid">
                {/* chat */}
                <Chatroom />
              </Route>
              <Route path="/">
                <Chatroom />
                {/* <h1>Home Screen</h1> */}
              </Route>
            </Switch>
          </Router>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
