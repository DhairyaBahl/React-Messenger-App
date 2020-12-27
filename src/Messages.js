import React from 'react';
import './Messages.css';

function Messages(props){
  const isUser=props.messages.username===props.username;
  return (
    <div class="message_div" >
      <h5 className={`sender ${props.dark?"senderDark":""}`} >{`${isUser?"":props.messages.username===null?"unknown user":props.messages.username}`}</h5>
      <h3 className={`msgs ${isUser?"user":"guest"} `} >{props.messages.message}</h3>
    </div>
  )
}

export default Messages;
