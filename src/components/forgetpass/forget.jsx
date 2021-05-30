import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import "./forget.css";
import forgetIllustration from "./forget.png";
import Email from 'react-email-autocomplete';

export default function Forget(props) {

    return(

<div className={`${
          props.apptheme ? "container_forget" : "container_forget_light"
        }`}>
      <div className="forget_illustration">
        <img src={forgetIllustration} width="300px" height="300px"></img>
      </div>
      <div className="forget-content">
        <form action = "/reset">
          <h1 style={{ fontSize: "30px" }} className="title">
            Forgot Password?
          </h1>
          <p className = "email-text">Enter the email address associated with your account</p>

          <div className="input-div">
            <div>
              <i className="fa fa-envelope icon"></i>
            </div>
            <div className="div">
               <Email  className = {`${props.apptheme ? "input2" : "input2_light"}`}  placeholder="Enter email" /> 

               
            </div>
          </div>
          <div className="submitbutton">
            <input type="submit" className="btn_forget" value="Submit"></input>
          </div>
        </form>
      </div>
    </div>
);
    }