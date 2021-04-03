import './App.css';
import {useState,useEffect,useRef, createRef} from 'react';
import {Button, Input,FormControl} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4"
import SendIcon from '@material-ui/icons/Send'
import logo from './logo.png';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Messages from './Messages.js'
import db from "./firebase.js"
import firebase from "firebase";
import Emoji from'./emojis/emojiscomponents';
import Picker from 'emoji-picker-react';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import './switcher.css';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';




// I have to make changes
function App() {

  const[colorTheme,setColorTheme]=useState('theme-white');
  const [input,setInput]=useState("");
  const inputRef=createRef();
  const [messages,setMessages]=useState([]);
  const [username,setUsername]=useState("");
  const [dark,setDark]=useState(false);
  const[showEmojis,setShowEmojis]=useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const messagesEndRef=useRef(null);
  const[cursorPosition,setCursorPosition]=useState();
  


  useEffect(()=>{
const currentThemeColor=localStorage.getItem('theme-color');
if(currentThemeColor){
  setColorTheme(currentThemeColor);
}

  },[])
  useEffect(()=>{
    setUsername(prompt("Kindly Enter Your Name"));
  },[])

  useEffect(()=>{db.collection('messages').orderBy("timestamp","asc").onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))},[])

  useEffect(() => { scrollToBottom() }, [messages]);
  useEffect(()=>{
    messagesEndRef.current.selectionEnd=cursorPosition;
  
  },[cursorPosition]);
  
const handleChange=e=>{
  setMessages(e.target.value);
}
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  };
const pickEmoji=(e,{emoji})=>{
  const ref=messagesEndRef.current;
  ref.focus();
  const start=messages.substring(0,ref.selectionStart);
  const end=messages.substring(ref.selectionStart);
  const text=start+emoji+end;
  setMessages(emoji);
  setCursorPosition(start.length+emoji.length);
};

  const newMessage= (event)=>{
    event.preventDefault();
    //setMessages([...messages,{message:input,username:username}]);
    if(input!=="")
    {
      db.collection('messages').add({username:username,message:input,timestamp:firebase.firestore.FieldValue.serverTimestamp()})
    }
    setInput("");
  }
  const handleShowEmojis=()=>{
    messagesEndRef.current.focus();
setShowEmojis(!showEmojis);
  };



  const theme=(event)=>{
    
    //add multicolr themes
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

  const handleClick=(themec)=>{
setColorTheme(themec);
localStorage.setItem('theme-color',themec)
  }

  return (
    <div className={`App ${colorTheme}`}>
    
     
      <nav className={`NavBar ${dark?"BlackNavBar":""}`} >
        <div className="flex1">
          <img className="Logo" src={logo} alt="messenger-logo" />
          
          <h1 className="messenger" ><span className={`${dark?"blackName":""} `}
          style={{color:"orange"}}>Mess</span><span className={`${dark?"blackName":""} `}  style={{color:"deeppink"}} >enger</span></h1>
        </div>
       
         
  
       
          <div id='theme-options'>
        
          <Button id="blackbtn" title="toggle Dark Mode"  className="dark" onClick={theme} ><Brightness4Icon /></Button>
          
          <table>

         <tr>
           
            <th>
       <div id='theme-pink' 
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
       <div id='theme-purple'
       onClick={()=>handleClick('theme-purple')}
       />
</th>
<th>
       <div id='theme-green'
       onClick={()=>handleClick('theme-green')}/>
</th>
</tr>


</table>

     </div>
     <Button id="themebtn" title="Click for various theme color"className="btntheme" onClick={colorstheme} ><ArrowLeftRoundedIcon/>Click</Button>
      </nav>
      <div className="scroll" >
        <br/><br/><br/><br/><br/>
        {
          messages.map(message=><Messages messages={message} username={username} dark={dark} key={genKey()}/>)
        }
        <div />
        <br/><br/><br/><br/><br/>
      </div>
      <div ref={messagesEndRef} />
      <footer className={`${dark?"footer_dark":""}`} >
      
      {
              // <div className={`emoji-list ${!showEmojis && 'hidden'}`}>
              //   <Emoji pickEmoji={pickEmoji}/>
              //   </div>
            }
          
          <div>
            {/* <div className="emoji-icon">
            <InsertEmoticonIcon onClick={handleShowEmojis}/>
            </div> */}
        <form>
        
          <FormControl>
            {but}
           
          </FormControl>
         {/* emoji picker button */}
         <Button className="iconButton" onClick={newMessage} type="submit" variant="contained" color="primary" > <SendIcon /></Button>
   
         
          
            
       
       
           
     
          
        </form>
        </div>
      </footer>
    </div>
  );
}

// keys generator:- every new call to this function will give numbs like 0,1,2,3....
const genKey = (function (){
  var keyCode = 0
  return function incKey(){
    return keyCode++;
  }
})();

export default App;
