import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import logo from "./logo.png";

import CircularProgress from "@material-ui/core/CircularProgress";
import Messages from "./components/messages/Messages.js";
import WelcomeDialogBox from "./WelcomeDialogBox";
import db from "./firebase.js";
import firebase from "firebase";
import './switcher.css';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';


function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [openWelcomeDialogBox, setOpenWelcomeDialogBox] = useState(false);
  const [dark, setDark] = useState(false);
  const[colorTheme,setColorTheme]=useState('theme-white');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setOpenWelcomeDialogBox(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log("setting true", loading);
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      });
  }, []);
  useEffect(()=>{
    const currentThemeColor=localStorage.getItem('theme-color');
    if(currentThemeColor){
      setColorTheme(currentThemeColor);
    }
    
      },[]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const newMessage = (event) => {
    event.preventDefault();
    //setMessages([...messages,{message:input,username:username}]);
    if (input.trim() !== "") {
      db.collection("messages").add({
        username: username,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    setInput("");
  };

  const handleKeyPress = (event) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      newMessage(event);
    }
  };

  const theme = (event) => {
    if (dark === false) {
      document.body.classList.add("dark-bg");
      setDark(true);
    } else {
      document.body.classList.remove("dark-bg");
      setDark(false);
    }
  };
  let check=true;
  const colorstheme=()=>{
if(document.getElementById("theme-options")&& check==true)
    {check=false;
      document.getElementById("theme-options").style.visibility = "visible";
  }
  else if(document.getElementById("theme-options")&& check==false)
{
  check=true;
      document.getElementById("theme-options").style.visibility = "hidden";
}
};

const handleClick=(themec)=>{
  setColorTheme(themec);
  localStorage.setItem('theme-color',themec)
    };
  return (
    <div className={`App ${colorTheme}`}>
      <nav className={`NavBar ${dark ? "BlackNavBar" : ""}`}>
        <div className="flex1">
          <img
            className="Logo"
            aspect-ratio="1/1"
            height="auto"
            width="82px"
            src={logo}
            alt="messenger-logo"
          />
          <h1 className={`messenger ${dark ? "blackName" : ""}`}>Messenger</h1>
        </div>
        <div id='theme-options'>
        
          <Button id="blackbtn" title="toggle Dark Mode"  className="dark" onClick={theme} ><Brightness4Icon /></Button>
          
          <table>

         <tr>
           
            <th>
       <div id='theme-pink' title="dark pink"
       onClick={()=>handleClick('theme-pink')}
       /></th>
        <th><div id='theme-white' title="original"
       onClick={()=>handleClick('theme-white')}
       /></th>
      <th>
       <div id='theme-orange' title="orange"
        onClick={()=>handleClick('theme-orange')}/>
</th>
    <th>
       <div id='theme-purple' title="purple"
       onClick={()=>handleClick('theme-purple')}
       />
</th>
<th>
       <div id='theme-green' title="green"
       onClick={()=>handleClick('theme-green')}/>
</th>
</tr>




</table>

     </div>
     <Button id="themebtn" title="Click for various theme color"className="btntheme" onClick={colorstheme} ><ArrowLeftRoundedIcon/><br></br>Theme Store</Button>
      </nav>
      {loading ? (
        <CircularProgress className="loading" />
      ) : (
        <>
          <div className="scroll">
            <br />
            <br />
            <br />
            <br />
            <br />
            {messages.map((message) => (
              <Messages
                messages={message}
                username={username}
                dark={dark}
                key={genKey()}
              />
            ))}
            <div />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div ref={messagesEndRef} />
          <div className="div__footer">
            <footer className={`${dark ? "footer_dark" : ""}`}>
              <div className="content__footer">
                <div className="sendNewMessage">
                  <button className={`addfiles ${dark ? "darkButton" : ""}`}>
                    <i className="fa fa-plus"></i>
                  </button>
                  <input
                    className={`input ${dark ? "dark_input" : "light_input"}`}
                    type="text"
                    placeholder="Type a message"
                    onChange={(event) => setInput(event.target.value)}
                    value={input}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className={`btnsend ${dark ? "darkButtonSend" : ""}`}
                    id="sendMsgBtn"
                    type="submit"
                    variant="contained"
                    onClick={newMessage}
                  >
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </footer>
            <WelcomeDialogBox
              open={openWelcomeDialogBox}
              close={() => setOpenWelcomeDialogBox(false)}
              setUsername={setUsername}
            />
          </div>
        </>
      )}
    </div>
  );
}

// keys generator:- every new call to this function will give numbs like 0,1,2,3....
const genKey = (function () {
  var keyCode = 0;
  return function incKey() {
    return keyCode++;
  };
})();

export default App;
