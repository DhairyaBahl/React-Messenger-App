import React from "react";
import "./LandingPage.css";
import sideimage from "./sideimage.png";

function Landing(props) {
  return (
    <div className={`${props.apptheme ? "container" : "container_light"}`}>
      <div className="text_side1">
        <div className="main_text1">
          <h1>
            Hang out
            <br></br>
            whenever,<br></br>wherever
          </h1>
        </div>
        <div className="small_text1">
          <p>  
            Stay closer to your loved ones. It&apos;s EASY &amp; more FUN with Messenger. 
          </p>
         </div>
         <div>
            <a href="/"><button className="enter_chat">Enter the Chat</button></a>
          </div>
            </div>
            <div className="image_side">
                <img src={sideimage} />
      </div>
    </div>
  );
}

export default Landing;
