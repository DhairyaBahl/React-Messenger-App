import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./reset.css";
import forgetIllustration from "../forgetpass/forget.png";

export default function Reset(props) {
  return (
    <div
      className={`${
        props.apptheme ? "container_reset" : "container_reset_light"
      }`}
    >
      <div className="reset_illustration">
        <img src={forgetIllustration} width="300px" height="300px"></img>
      </div>
      <div className="reset-content">
        <form>
          <h1 style={{ fontSize: "30px" }} className="title">
            Reset Password
          </h1>

          <div className="input-div pass">
            <div className="i">
              <i className="fa fa-lock lock-icon"></i>
            </div>
            <div className="div">
              <input
                type="password"
                placeholder="New Password"
                className="input"
              ></input>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fa fa-lock lock-icon"></i>
            </div>
            <div className="div">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input"
              ></input>
            </div>
          </div>
          <div className="submitbutton">
            <input type="submit" className="btn_reset" value="Submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
}
