import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./Chatroom.css";
import { Avatar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { useStateValue } from "../StateProvider";
function Chatroom() {
  const [input, setinput] = useState("");
  const { roomid } = useParams();
  const [roomname, setroomname] = useState("");
  const [message, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

 
  useEffect(() => {
    if (roomid) {
      database
        .collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));
      database
        .collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  const SendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
    });
    setinput("");
  };

  return (
    <div className="chatroom">
      <div className="chatroom__header">
        <Avatar />
        <div className="chatroom__headerinfoleft">
          <h3>{roomname}</h3>
          <p>
            last seen{" "}
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatroom__header__inforight">
         
        </div>
      </div>
      <div className="chatroom__body">
        {message.map((message) => (
          <p
            className={`chatroom__message ${
              message.name === user.displayName && `chatroom__messagerecierver`
            }`}
          >
            <span className="chatroom__username">{message.name}</span>
            {message.message}
            <span className="chatroom__messagetimestamp ">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chatroom__footer">
        <SentimentVerySatisfiedIcon />
        <form>
          <input
            value={input}
            onChange={(event) => setinput(event.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={SendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chatroom;
