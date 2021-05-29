import "./App.css";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Button } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import logo from "./logo.png";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Messagesentaudio from "./sound/MessageSound.mp3";
import CircularProgress from "@material-ui/core/CircularProgress";
import WelcomeDialogBox from "./WelcomeDialogBox";
import db from "./firebase.js";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { purple } from "@material-ui/core/colors";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Forget from "./components/forgetpass/forget";
import Reset from "./components/resetpass/reset";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import useLocalStorage from "./customHooks/useLocalStorage";
import About from "./components/about-us/About";
import Footer from "./components/footer/footer";
import ContactUs from "./components/contactForm/contactForm.js";
import Messages from "./components/messages/Messages.js";
import Landing from "./components/Landingpage/LandingPage";
import Faq from "./components/faq/faq";
import Features from "./components/Featurespage/FeaturesPage";
import LoadingBar from 'react-top-loading-bar'
import CopyToClipboard from 'react-copy-to-clipboard';



function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useLocalStorage("username", "");
  const [uid, setUid] = useLocalStorage("uid", "");
  const [openWelcomeDialogBox, setOpenWelcomeDialogBox] = useState(false);
  const [dark, setDark] = useLocalStorage("dark", false);
  const messagesEndRef = useRef(null);
  const inputElement = useRef(null);
  const [click, setClick] = useState(false);
  const [showEmojis, setshowEmojis] = useState(false);
  const [showKeyboard, setshowKeybord] = useState(false);
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [showAlert, setShowAlert] = useState(false);
  const [messageCount, setMessageCount] = useState(50);
  const [scrollTop, setScrollTop] = useState(false);
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [progress, setProgress] = useState(0)
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!username || !uid) setOpenWelcomeDialogBox(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", messages);
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    console.log("setting true", loading);
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .limit(messageCount)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()).reverse());
        setLoading(false);
      });
    setScrollTop(true);
  }, [messageCount]);

  useEffect(() => {
    if (scrollTop) return setScrollTop(false);
    scrollToBottom();
  }, [messages]);

  const handleClick = () => setClick(!click);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const newMessage = (event) => {
    //event.preventDefault();
    //setMessages([...messages,{message:input,username:username}]);
    if (input.trim() !== "") {
      db.collection("messages").add({
        username: username,
        uid: uid,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      new Audio(Messagesentaudio).play();
    }
    setInput("");
  };

  const handleKeypress = (event) => {
    console.log("yes");
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      console.log("13");
      newMessage();
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
  const addEmoji = (e) => {
    let emoji = e.native;
    let cursorPositionStart = inputElement.current.selectionStart;
    let newinput =
      input.slice(0, cursorPositionStart) +
      emoji +
      input.slice(cursorPositionStart);
    setInput(newinput);
    inputElement.current.focus();
  };
  const emojiToggle = (e) => {
    console.log("in emojiToggle");
    if (showEmojis === true) {
      setshowEmojis(false);
      console.log("picker not visible");
    } else {
      setshowEmojis(true);
      console.log("picker visible");
    }
  };
  // const addKeyboard = (e) => {
  //     let keyboard = e.native;
  //     let cursorPositionStart = inputElement.current.selectionStart;
  //     let newinput =
  //         input.slice(0, cursorPositionStart) +
  //         keyboard +
  //         input.slice(cursorPositionStart);
  //     setInput(newinput);
  //     inputElement.current.focus();
  // };
  const keyboardToggle = (e) => {
    console.log("in keyboardToggle");
    if (showKeyboard === true) {
      setshowKeybord(false);
      console.log("picker not visible");
    } else {
      setshowKeybord(true);
      console.log("picker visible");
    }
  };
  const loadOlderMessages = () => {
    setMessageCount((prev) => prev + 50);
    setProgress(100);
  };
  useEffect(() => {
    if (finalTranscript !== "") {
      setShowAlert(false);
      setInput(finalTranscript);
      resetTranscript();
    }
  });
  const Speechtoinput = (e) => {
    setShowAlert(true);
    SpeechRecognition.startListening();
  };
  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };
  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <Router>
      {/*================ NavBar. Common across all routes ======================*/}

      <nav className={`${dark ? "nav_dark" : "navbar"}`}>
        <div className="nav-container">
          <a href="/landing">
            <img
              className="Logo"
              aspect-ratio="1/1"
              height="auto"
              width="50px"
              src={logo}
              alt="messenger-logo"
            />
          </a>
          <h1 style={{ fontSize: "25px" }} className={`messenger`}>
            Messenger
          </h1>
          <a href="/" className="nav-logo"></a>

          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            id={dark ? "nav-menu_dark" : "nav-menu_light"}
          >
            <li className="nav-item">
              <Link
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/features"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item toggle-nav" style={{ border: "none" }}>
              <Button
                title="toggle Dark Mode"
                className="dark toggle-button"
                onClick={theme}
              >
                <Brightness4Icon
                  className="darkthemeicon"
                  style={{ border: "none", fontSize: "25px" }}
                />
              </Button>
            </li>
          </ul>
          <div
            className={`nav-icon ${dark ? "nav-icon_dark" : "nav-icon_light"}`}
            onClick={handleClick}
          >
            <i>
              <MenuIcon style={{ fontSize: "30px", marginTop: "3px" }} />
            </i>
          </div>
        </div>
      </nav>

      {/*========================== End of NavBar ============================*/}

      <Switch>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              Loading...
            </div>
          }
        >
          {/*========================== about us ============================*/}

          <Route exact path="/about">
            <About apptheme5={dark} />
            <Faq apptheme4={dark} />
            <ContactUs apptheme={dark} />
            <Footer apptheme2={dark} />
          </Route>
          {/*========================== landing page ============================*/}

          <Route exact path="/landing">
            <Landing apptheme={dark} />
            <Footer apptheme2={dark} />
          </Route>
          {/* ============================Login page ============================ */}
          <Route exact path="/login">
            <Login apptheme={dark} />
            <Footer apptheme2={dark} />
          </Route>
          <Route exact path="/signup">
            <Signup apptheme={dark}/>
            <Footer apptheme2={dark} />
          </Route>
          <Route exact path="/forget">
             <Forget apptheme={dark}/>
             <Footer apptheme2={dark}/>
          </Route>
          <Route exact path="/reset">
             <Reset apptheme={dark}/>
             <Footer apptheme2={dark}/>
          </Route>
          {/* ============================features page ============================ */}

          <Route exact path="/features">
            <Features apptheme3={dark} />
            <Footer apptheme2={dark} />
          </Route>

          {/*========================== home page ============================*/}

          <Route exact path="/">
            <div className="App">
              {loading ? (
                <CircularProgress className="loading" />
              ) : (
                <>
                  <div className="scroll">
                  <LoadingBar color=' red' progress={progress} onLoaderFinished={() => setProgress(0)} />
                    <br />
                    <br />
                    <br />
                    <button
                      className="loadOlderMessages"
                      onClick={loadOlderMessages}
                      
                    >
                      Load Older Messages
                    </button>
                    <br />
                    <br />
                    {messages.map((message) => (
                      <Messages
                        messages={message}
                        username={username}
                        uid={uid}
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
                        <div
                          className={` ${
                            dark ? "sendNewMessagedark" : "sendNewMessage"
                          }`}
                        >
                          <button
                            className={`addfiles ${dark ? "darkButton" : ""}`}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button className="EmojiToggle">
                            <InsertEmoticonIcon onClick={emojiToggle} />
                          </button>
                          {showEmojis && (
                            <span
                              className={`${
                                dark ? "EmojiPicker_dark" : "EmojiPicker"
                              }`}
                            >
                              <Picker onSelect={addEmoji} />
                            </span>
                          )}
                          <button className="KeyboardToggle">
                            <i
                              className="fa fa-keyboard-o"
                              onClick={keyboardToggle}
                            ></i>
                          </button>
                          {showKeyboard && (
                            <span
                              className={`${
                                dark ? "KeyboardPicker_dark" : "KeyboardPicker"
                              }`}
                            >
                              {/* <input
                                                                onChange={onChangeInput}
                                                            /> */}
                              <Keyboard
                                keyboardRef={(r) => (keyboard.current = r)}
                                layoutName={layout}
                                onChange={onChange}
                                onKeyPress={onKeyPress}
                              />
                            </span>
                          )}
                          <input
                              type="text"
                              onChange={(e) => {
                                setValue(e.target.value);
                                setStatus(false);
                              }}
                            />
                            <CopyToClipboard text={value} onCopy={() => setStatus(true)}>
                              <button className="copy">  <i
                              className="fa fa-copy"
                            ></i></button>
                            </CopyToClipboard>
                      
                            
                          <input
                            ref={inputElement}
                            className={`input ${
                              dark ? "dark_input" : "light_input"
                            }`}
                            type="text"
                            placeholder="Type a message"
                            onChange={(event) => setInput(event.target.value)}
                            onKeyPress={handleKeypress}
                            value={input}
                          />
                          <div className="speak">
                            <button onClick={Speechtoinput}>
                              <i className="fa fa-microphone"></i>
                            </button>
                            {showAlert && (
                              <span className="Speaknow_alert">Speak now</span>
                            )}
                          </div>

                          <button
                            className={`btnsend ${
                              dark ? "darkButtonSend" : ""
                            }`}
                            id="sendMsgBtn"
                            type="submit"
                            variant="contained"
                            crossOrigin="anonymous"
                            onClick={newMessage}
                          >
                            <i className="fa fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </footer>
                    <div className="scrolltobottom">
                      <Button title="scroll to bottom" onClick={scrollToBottom}>
                        <KeyboardArrowDownIcon className="scrollicon" />
                      </Button>
                    </div>
                    <WelcomeDialogBox
                      open={openWelcomeDialogBox}
                      close={() => setOpenWelcomeDialogBox(false)}
                      setUsername={setUsername}
                      setUid={setUid}
                    />
                  </div>
                </>
              )}
            </div>
          </Route>
        </Suspense>
      </Switch>
    </Router>
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
