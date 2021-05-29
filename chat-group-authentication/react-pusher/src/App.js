// Import React and Component from React
import React, { Component } from 'react';
// Import the Navbar, Nav, Button component from the react-bootstrap
import { Navbar, Nav, Button } from 'react-bootstrap';
// Import the CSS styles from the App.css file
import './App.css';

class App extends Component {
    // This function helps with navigation of different routes
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
    // This function calls on the auth login() function and logs in a user with Auth0
    login() {
      this.props.auth.login();
    }
      // This function calls on the auth logout() function and clears the localStorage thereby logging a user out.
    logout() {
      this.props.auth.logout();
    }
  
    render() {
          // Destructuring assignment syntax is used to get the isAuthenticated function from the Authentication service in Auth.js
      const { isAuthenticated } = this.props.auth;
  
      return (
        <div>
          <Navbar className="no-border" fluid inverse>
            <Navbar.Header>
            <Navbar.Brand>
            <a href="/home">ReactChat</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="pull-right">
          <Button
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
          >
            Home
          </Button>
            {
              !isAuthenticated() && (
                <Button
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                >
                  Login
                </Button>
            )
        }
        {
            isAuthenticated() && (
              <Button
              className="btn-margin"
              onClick={this.goTo.bind(this, 'profile')}
          >
            Profile
          </Button>
      )
  }
  {
      isAuthenticated() && (
          <Button
              className="btn-margin"
              onClick={this.goTo.bind(this, 'chat')}
                      >
                        Chat
                      </Button>
                  )
              }
              {
                  isAuthenticated() && (
                      <Button
                          className="btn-margin"
                          onClick={this.logout.bind(this)}
                      >
                        Log Out
                      </Button>
                      )
              }
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
