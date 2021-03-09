import './App.css';
import {useState,useEffect,useRef} from 'react';
import {Button, Input,FormControl} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4"
import SendIcon from '@material-ui/icons/Send'
//import {IconButton} from '@material-ui/core'
import logo from './logo.png';
import Messages from './Messages.js'
import db from "./firebase.js"
import firebase from "firebase";

function App() {

  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([]);
  const [username,setUsername]=useState("");
  const [dark,setDark]=useState(false);
  const scrollToBottom=()=>{
    endRef.current.scrollIntoView({behaviour:"smooth"})
  }

  useEffect(scrollToBottom,[]);

  useEffect(()=>{
    setUsername(prompt("Kindly Enter Your Name"));
  },[])

  useEffect(()=>{db.collection('messages').orderBy("timestamp","asc").onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))},[])

  const endRef=useRef(null);

  const newMessage=(event)=>{
    event.preventDefault();
    //setMessages([...messages,{message:input,username:username}]);
    if(input!=="")
    {
      db.collection('messages').add({username:username,message:input,timestamp:firebase.firestore.FieldValue.serverTimestamp()})
    }
    setInput("");
  }

  const theme=(event)=>{
    if(dark===false)
    {
      document.body.classList.add('dark-bg');
      setDark(true);
    }
    else
    {
      document.body.classList.remove('dark-bg');
      setDark(false);
    }
  }

  let but;
  if(dark)
  {
    but=<input className={`input ${dark?"dark_input":""}`} placeholder="Write Your Message" value={input} onChange={event=>setInput(event.target.value)} />
  }
  else
  {
    but=<Input className={`input ${dark?"dark_input":""}`} placeholder="Write Your Message" value={input} onChange={event=>setInput(event.target.value)} />
  }

  return (
    <div className="App">
      <nav className={`NavBar ${dark?"BlackNavBar":""}`} >
        <Button variant="contained" className="dark" onClick={theme} ><span style={{fontWeight:"bold",fontSize:"20px"}} ></span><Brightness4Icon /></Button>
        <h1 className="messenger" ><span className={`${dark?"blackName":""} `} style={{color:"orange"}}>Mess</span><span className={`${dark?"blackName":""} `}  style={{color:"deeppink"}} >enger</span></h1>
        <img className="Logo" src={logo} alt="messenger-logo" />
      </nav>
      <div >
        <br/><br/><br/><br/><br/>
        {
          messages.map(message=><Messages messages={message} username={username} dark={dark} />)
        }
        <div ref={endRef} />
        <br/><br/><br/><br/><br/>
      </div>
      <footer className={`${dark?"footer_dark":""}`} >
        <form>
          <FormControl>
            {but}
          </FormControl>
          <Button className="iconButton" onClick={newMessage} type="submit" variant="contained" color="primary" > <SendIcon /></Button>
        </form>
      </footer>
    </div>
  );
}

export default App;
