import React from 'react';
import './Messages.css';

function Messages(props){
  const isUser=props.messages.username===props.username;
  return (
    <div className="message_div" >
      <h5 className={`sender ${props.dark?"senderDark":""}`} >{`${isUser?"":props.messages.username===null?"unknown user":props.messages.username}`}</h5>
      <div className={`msgs ${isUser?"user":"guest"} `} >
        {props.messages.message}
        <p className="time-stamp">{giveTimePassed(props.messages.timestamp)}</p>
      </div>
    </div>
  )
}

function giveTimePassed(timestamp){
  if(!timestamp){
    return "just now"
  }
  // time difference in millisec
  var timeDiff = new Date() - timestamp.toDate();
  
  // seconds
  timeDiff /= 1000;
  timeDiff = Math.floor(timeDiff)
  if(timeDiff < 5){
    return "just now"
  }
  if(timeDiff < 60){
    return `${timeDiff} second${timeDiff===1?"":"s"} ago`;
  }
  
  // minutes
  timeDiff /= 60;
  timeDiff = Math.floor(timeDiff)
  if(timeDiff < 60){
    return `${timeDiff} minute${timeDiff===1?"":"s"} ago`;
  }

  // hours
  timeDiff /= 60;
  timeDiff = Math.floor(timeDiff)
  if(timeDiff < 60){
    return `${timeDiff} hour${timeDiff===1?"":"s"} ago`;
  }

  // days
  timeDiff /= 24;
  timeDiff = Math.floor(timeDiff)
  if(timeDiff < 30){
    return `${timeDiff} day${timeDiff===1?"":"s"} ago`;
  }

  // months
  timeDiff /= 30;
  timeDiff = Math.floor(timeDiff)
  if(timeDiff < 12){
    return `${timeDiff} month${timeDiff===1?"":"s"} ago`;
  }

  // years
  timeDiff /= 12;
  timeDiff = Math.floor(timeDiff)
  return `${timeDiff} year${timeDiff===1?"":"s"} ago`;
}

export default Messages;
