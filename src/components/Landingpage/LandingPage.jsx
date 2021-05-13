import React from "react";
import "./LandingPage.css";
import sideimage from "./sideimage.png";

function Landing() {
  return (
    <div className="container">
      <div className="text_side">
        <div className="main_text">
          <h1>
            Hang out
            <br></br>
            whenever,<br></br>wherever
          </h1>
        </div>
        <div className="small_text">
          <p>
            Messenger makes it easy and fun to stay close to your<br></br>{" "}
            favourite people.
          </p>
        </div>
        <div>
          <a href="/">
            <button className="chat_button">Enter the Chat</button>
          </a>
        </div>
      </div>
      <div className="image_side">
        <img src={sideimage} />
      </div>
    </div>
  );
}

export default Landing;
