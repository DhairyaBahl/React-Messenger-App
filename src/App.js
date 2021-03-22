import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button, FormControl } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import logo from "./logo.png";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from '@material-ui/core/CircularProgress';
import Messages from "./Messages.js";
import WelcomeDialogBox from "./WelcomeDialogBox";
import db from "./firebase.js";
import firebase from "firebase";

function App() {
  const [loading,setLoading]=useState(false)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [openWelcomeDialogBox, setOpenWelcomeDialogBox] = useState(false);
  const [dark, setDark] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setOpenWelcomeDialogBox(true);
  }, []);

  useEffect(() => {
    setLoading(true)
    console.log("setting true",loading)
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>{
        setMessages(snapshot.docs.map((doc) => doc.data()));
        setLoading(false)
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
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

  const theme = (event) => {
    if (dark === false) {
      document.body.classList.add("dark-bg");
      setDark(true);
    } else {
      document.body.classList.remove("dark-bg");
      setDark(false);
    }
  };

  return (
    <div className="App">
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
        <div className="flex2">
          <Button
            title="toggle Dark Mode"
            variant="contained"
            className="dark"
            onClick={theme}
          >
            <Brightness4Icon />
          </Button>
        </div>
      </nav>
      {
          loading?<CircularProgress className="loading"/>:
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
      }
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
