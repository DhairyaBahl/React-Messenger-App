import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Typography,
  Button,
  IconButton,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
class Header extends Component {
  state = {
    open: false
  };
  handleMenubutton = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={this.props.classes.heading}
              variant="display1"
              color="inherit"
            >
              Chat Server
            </Typography>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                onClick={this.handleMenubutton}
                className={this.props.classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Typography className={this.props.classes.links}>
                <Button href="/api/signup" color="primary" variant="contained">
                  Signup
                </Button>

                <Button href="/api/signin" color="primary" variant="contained">
                  Signin
                </Button>

                <Button href="/api/chat" color="primary" variant="contained">
                  Chat
                </Button>
              </Typography>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="persistent"
            anchor="top"
            open={this.state.open}
            classes={{ paperAnchorTop: this.props.classes.drawerColor }}
          >
            <div className={this.props.classes.drawerWidth}>
              <IconButton onClick={this.handleMenubutton}>
                <KeyboardArrowUpIcon />
              </IconButton>

              <List>
                {["SignUp", "SignIn", "Chat"].map((text, index) => (
                  <ListItem button key={index}>
                    <Button href={`#${text}`} onClick={this.handleMenubutton}>
                      <ListItemText primary={text} />
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default Header;
