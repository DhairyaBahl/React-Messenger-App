import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./login.css";
import loginIllustartion from "./logo1.svg";

export default function Login(props) {


    return (

        <div className={`${props.apptheme ? "dark" : "light"}`}>
            <div className={`${props.apptheme ? "container_login" : "container_login_light"}`}>
                <div className="illustration_img">
                    <img src={loginIllustartion}></img>
                </div>
                <div className="login-content">
                    <form className="login_form">
                        <h2 style={{ fontSize: "27px" }} className="title">Welcome</h2>


        <div className={`${props.apptheme ? "container_login" : "container_loginlight"
            }`}>
            <div className="illustration_img">
                <img src={loginIllustartion}></img>
            </div>
            <div className="login-content">
                <form className="login_form">
                    <h2 style={{ fontSize: "27px" }} className="title">Welcome</h2>

                    <h1 style={{ fontSize: "18px", marginBottom: "30px" }}>Sign in to your account</h1>



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

                        <a className="anc" href="/forget"><span style={{ color: "red" }}>Forgot Password?</span></a>

                        <div className="loginbutton">
                            <input type="submit" className="btn_login" value="Login"></input>
                        </div>

                        <div id="alternativeLogin">
                            <a className="anc" href="/signup"> Create your account! </a>
                        </div>

                    </form>
                  </div>
             </div>
         </div>
       
       
    );
}