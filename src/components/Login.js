import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { authentication, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    authentication
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__body">
        <img
          alt="React Messenger"
          src="https://mui-message.firebaseapp.com/static/media/logo.598c4dd7.png"
        />
        <div className="login__text">
          <h1>Welcome To React Messenger</h1>
        </div>

        <Button onClick={signIn}>SignIn with Google</Button>
       
      </div>
    </div>
  );
}

export default Login;
