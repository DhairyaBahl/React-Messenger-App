import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import "./signup.css";
import loginIllustartion from "./logo.png";

export default function Signup(props) {

    return(

<div className= "container_login">
  <div className="illustration_img">
    <img src={loginIllustartion}></img>
  </div>
  <div className="login-content">
    <form className="login_form">
      <h2  style={{fontSize:"27px"}} className="title">Welcome To Messenger</h2>

      <h1 style={{fontSize:"18px", marginBottom:"30px",color:"#333"}}>Create an account</h1>
    <div className="input-div pass">
            <div className="i"> 
                <i className="fa fa-envelope"></i>
            </div>
            <div className="div">
                <input type="mail" placeholder="E-mail" className="input"></input>
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
      

      <a className="anc" href="#"><span style={{color:"blue"}}>Already have an account?</span></a>

      <div className="loginbutton">
        <input type="submit" className="btn_login" value="Signup"></input>
      </div>
    </form>
  </div>
</div>

);
    }