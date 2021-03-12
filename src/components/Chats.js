
import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { database } from "../firebase";
import { Link } from "react-router-dom";

function Chats({ addChat, id, name }) {
  const [avatars, setavatars] = useState("");
  const [messages, setmessages] = useState("");

  useEffect(() => {
    setavatars(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      database
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const addnewChat = () => {
    const chatName = prompt("Enter A name");

    if (chatName) {
      //Here this will add the new chat room doc
      database.collection("rooms").add({
        name: chatName,
      });
    }
  };

  return !addChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="chats">
        <Avatar src={`https://avatars.dicebear.com/api/human/${avatars}.svg`} />
        <div className="chats__info">
          <h3>{name}</h3>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={addnewChat} className="chats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default Chats;
