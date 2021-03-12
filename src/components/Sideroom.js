import React, { useState, useEffect } from "react";
import "./Sideroom.css";
import { Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chats from "./Chats";
import { database } from "../firebase";
import { useStateValue } from "../StateProvider";
function Sideroom() {
  const [rooms, setrooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  
  useEffect(() => {
    const unsubsctibe = database.collection("rooms").onSnapshot((snapshot) =>
      setrooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubsctibe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerright">
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="siebar__search">
        <div className="sidebar__searchcontainer">
          <SearchIcon />
          <input placeholder="chats" type="text" />
        </div>
      </div>

      <div className="sidebar__chhatsGroups">
        <Chats addChat />
        {rooms.map((room) => (
          <Chats key={room.id} id={room.id} name={room.data.name}  />
        ))}
      </div>
    </div>
  );
}

export default Sideroom;
