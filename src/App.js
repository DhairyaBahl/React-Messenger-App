import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button, Input, FormControl, IconButton } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import SendIcon from "@material-ui/icons/Send";
import logo from "./logo.png";
import Messages from "./Messages.js";
import db from "./firebase.js";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [dark, setDark] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setUsername(prompt("Kindly Enter Your Name"));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
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
    if (input !== "") {
      db.collection("messages").add({
        username: username,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
        <Button variant="contained" className="dark" onClick={theme}>
          <Brightness4Icon />
        </Button>
        <h1 className="messenger">
          <span
            className={`${dark ? "blackName" : ""} `}
            style={{ color: "orange" }}
          >
            Mess
          </span>
          <span
            className={`${dark ? "blackName" : ""} `}
            style={{ color: "deeppink" }}
          >
            enger
          </span>
        </h1>
        <img className="Logo" src={logo} alt="messenger-logo" />
      </nav>
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
      <footer className={`footer ${dark ? "footer_dark" : ""}`}>
        <form
          noValidate
          autoComplete="off"
          className={` ${dark ? "text-form-dark" : "text-form"}`}
        >
          <FormControl className="text-formControl">
            <Input
              className={`text-bar input ${dark ? "dark_input" : ""}`}
              placeholder="Write Your Message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>

          <IconButton
            aria-label="submit"
            className="iconButton"
            type="submit"
            onClick={newMessage}
            variant="contained"
            color="primary"
          >
            <SendIcon fontSize="large" />
          </IconButton>
        </form>
      </footer>
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
