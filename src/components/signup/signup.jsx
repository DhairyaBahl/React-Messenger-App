import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import "./signup.css";
import loginIllustartion from "./logo.svg";
import Email from 'react-email-autocomplete';
import { Fade } from 'react-reveal';
import GoogleLogin from 'react-google-login';

export default function Signup(props) {
    const responseGoogle = (response) => {
        console.log(response);
      }
      
    return (

        <div className={`${props.apptheme ? "container_signup" : "container_signup_light"
            }`}>
            <div className="illustration_img">
              
                    <img src={loginIllustartion}></img>
                
            </div>
            <div className="login-content">
                <form className="login_form">
                    <Fade top duration={1500}>
                        <h2 style={{ fontSize: "27px" }} className="title">Welcome To Messenger</h2>

                        <h1 style={{ fontSize: "18px", marginBottom: "30px" }}>Create an account</h1>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fa fa-envelope"></i>
                            </div>
                            {/* <div className="div">
                <input type="mail" placeholder="E-mail" className="input"></input>
            </div> */}
                            <div className="div">
                                <Email className={`${props.apptheme ? "input1" : "input1_light"}`} placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="div">
                                <input type="text" placeholder="Username" className="input"></input>
                            </div>
                        </div>

                        <div className="input-div pass">
                            <div className="i">
                                <i className="fa fa-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" placeholder="Password" className="input"></input>
                            </div>
                        </div>


                        <a className="anc" href="/login"><span style={{ color: "blue" }}>Already have an account?</span></a>

                        <div className="loginbutton">
                            <input type="submit" className="btn_login" value="Signup"></input>
                        </div>
                        <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
   
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                    </Fade>
                </form>
            </div>
        </div>

    );
}