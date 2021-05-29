import React from "react";
import "./FeaturesPage.css";
import sideimage from "./sideimage.png";
import sideimage3 from "./blacktheme.png";
import sideimage2 from "./emoji.png";
function Features(props) {

    return (
        <div>
            <div className={`${props.apptheme3 ? "container" : "container_light"}`}>
                <div className="text_side">
                    <div className="main_text">
                        <h1>More ways
                        <br></br>
                        to stay <br></br>connected</h1>
                    </div>
                    <div className={`${props.apptheme3 ? "small_text2_dark" : "small_text2"}`}>
                        <p>Messenger has everything you need to feel <br></br> closer to your favourite people.</p>
                    </div>
                </div>
                <div className="image_sidem">
                    <img src={sideimage} />
                </div>
            </div>

            <div className={`${props.apptheme3 ? "container" : "container_light"}`}>
                <div className="image_side2">
                    <img src={sideimage2} />
                </div>
                <div className="text_side2">
                    <div className="min-text">
                        <h3>Custom Reactions</h3>
                    </div>
                    <div className={`main_text2 ${props.apptheme3 ? "main_text2_dark" : "main_text2_light"}`}>
                        <h1>Say it with
                        <br></br>
                        any <span style={{ color: 'rgb(133, 29, 186)' }}>emoji</span></h1>
                    </div>
                    <div className={`${props.apptheme3 ? "small_text2_dark" : "small_text2"}`}>
                        <p>Lost for words? Now you can customise your reactions <br></br> with way more emojis to choose from, including 🎉 and 🔥 </p>
                    </div>
                </div>
            </div>


            <div className={`${props.apptheme3 ? "container" : "container_light"}`}>
                <div className="text_side">
                    <div className="min-text">
                        <h3>Chat Themes</h3>
                    </div>
                    <div className={`main_text2 ${props.apptheme3 ? "main_text2_dark" : "main_text2_light"}`}>
                        <h1>Your <span style={{ color: 'rgb(133, 29, 186)' }}>chats</span>
                            <br></br>
                         Your way</h1>
                    </div>
                    <div className={`${props.apptheme3 ? "small_text2_dark" : "small_text2"}`}>
                        <p>Choose from light and dark themes to comfort <br></br> your eyes and chat for long  ❤️ 🏳️‍🌈</p>
                    </div>
                </div>
                <div className="image_side7">
                    <img src={sideimage} />
                </div>
                <div className="image_side7_2">
                    <img src={sideimage3} />
                </div>
            </div>

            <div className={`${props.apptheme3 ? "container" : "container_light"}`}>
                <div className="image_side2">
                    <img src={sideimage} />
                </div>
                <div className="text_side2">
                    <div className="min-text">
                        <h3>Voice Input</h3>
                    </div>
                    <div className={`main_text2 ${props.apptheme3 ? "main_text2_dark" : "main_text2_light"}`}>
                        <h1>Stop typing,
                        <br></br>
                      Start <span style={{ color: 'rgb(133, 29, 186)' }}>talking!</span></h1>
                    </div>
                    <div className={`${props.apptheme3 ? "small_text2_dark" : "small_text2"}`}>
                        <p>Switching from typing to talking comes with <br></br>a range of benefits🔥 </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;