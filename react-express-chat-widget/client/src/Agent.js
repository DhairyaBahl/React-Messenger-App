import React, {Component} from 'react';

import {CometChat} from '@cometchat-pro/chat';
import MDSpinner from "react-md-spinner";
import config from './config';

const agentUID = config.agentUID;
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener'
const limit = 30;

class Agent extends Component {

  state = {
    customers: [],
    selectedCustomer: '',
    chat: [],
    chatIsLoading: false,
    customerIsLoading:true
  }

  componentDidMount(){
    this.fetchAuthToken(agentUID).then(
      authToken => {
        console.log('auth token fetched', authToken);
        CometChat.login(authToken)
        .then( user => {
          console.log("Login successfully:", { user });
          this.fetchUsers().then(result => {
            this.setState({
              customers: result,
              customerIsLoading: false
            })
          });
          
          CometChat.addMessageListener(
            AGENT_MESSAGE_LISTENER_KEY,
            new CometChat.MessageListener({
              onTextMessageReceived: message => {
                let {customers, selectedCustomer, chat} = this.state;
                console.log("Incoming Message Log", { message });
                if(selectedCustomer === message.sender.uid){
                  chat.push(message);
                  this.setState({
                    chat
                  })
                } else {
                  let aRegisteredCustomer = customers.filter( customer => { return customer.uid === message.sender.uid }); 
                  if(!aRegisteredCustomer.length){
                    customers.push(message.sender)
                    this.setState({
                      customers
                    })
                  }
                }
              }
            })
          );
       })
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

  fetchAuthToken = async uid => {
    const response = await fetch(`/api/auth?uid=${uid}`)
    const result = await response.json()
    return result.authToken;
  }

  fetchUsers = async () => {
    const response = await fetch(`/api/users`)
    const result = await response.json()
    return result;
  }

  handleSubmit = event => {
    event.preventDefault();
    let message = this.refs.message.value;

    var textMessage = new CometChat.TextMessage(
      this.state.selectedCustomer,
      message,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.USER
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        let {chat} = this.state;
        console.log('Message sent successfully:', message);
        chat.push(message);
        this.setState({
          chat
        })
      },
      error => {
        console.log('Message sending failed with error:', error);
      }
    );
    this.refs.message.value='';
  }

  componentWillUnmount(){
    CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY);
    CometChat.logout();
  }

  selectCustomer = uid => {
    this.setState({
      selectedCustomer: uid
    }, ()=> {this.fetchPreviousMessage(uid)})
  }

  fetchPreviousMessage = uid => {
    this.setState({
      chat: [],
      chatIsLoading: true
    }, () => {
      var messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(uid)
      .setLimit(limit)
      .build();

      messagesRequest.fetchPrevious().then(
        messages => {
          console.log("Message list fetched:", messages);
          this.setState({
            chat: messages,
            chatIsLoading: false
          })
        },
        error => {
          console.log("Message fetching failed with error:", error);
        }
      );
    });
  }

  render() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className="col-md-8 h-100pr border rounded">
            <div className='row'>
              <div className='col-lg-4 col-xs-12 bg-light' style={{ height: 658 }}>
              <div className='row p-3'><h2>Customer List</h2></div>
              <div className='row ml-0 mr-0 h-75 bg-white border rounded' style={{ height: '100%', overflow:'auto' }}>
              <CustomerList {...this.state} selectCustomer={this.selectCustomer}/>
              </div>
              </div>
              <div className='col-lg-8 col-xs-12 bg-light'  style={{ height: 658 }}>
                <div className='row p-3 bg-white'>
                  <h2>Who you gonna chat with?</h2>
                </div>
                <div className='row pt-5 bg-white' style={{ height: 530, overflow:'auto' }}>
                <ChatBox {...this.state} />
                </div>
                <div className="row bg-light" style={{ bottom: 0, width: '100%' }}>
                <form className="row m-0 p-0 w-100" onSubmit={this.handleSubmit}>
    
                <div className="col-9 m-0 p-1">
                  <input id="text" 
                    className="mw-100 border rounded form-control" 
                    type="text" 
                    name="text" 
                    ref="message"
                    placeholder="Type a message..."/>
                </div>
                <div className="col-3 m-0 p-1">
                  <button className="btn btn-outline-secondary rounded border w-100" 
                    title="Send" 
                    style={{ paddingRight: 16 }}>Send</button>
                </div>
                </form>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ChatBox extends Component {
  render(){
    const {chat, chatIsLoading} = this.props;
    if (chatIsLoading) {
      return (
        <div className='col-xl-12 my-auto text-center'>
          <MDSpinner size='72'/>
        </div>
      )
    }
    else {
      return (
        <div className='col-xl-12'>
          { 
            chat
            .map(chat => 
              <div key={chat.id} className="message">
                <div className={`${chat.receiver !== agentUID ? 'balon1': 'balon2'} p-3 m-1`}>
                  {chat.text}
                </div>
              </div>)
          }  
        </div>
      )
    }
  }

}


class CustomerList extends Component {
  render(){
    const {customers, customerIsLoading, selectedCustomer} = this.props;
    if (customerIsLoading) {
      return (
        <div className='col-xl-12 my-auto text-center'>
          <MDSpinner size='72'/>
        </div>
      )
    }
    else {
      return (
        <ul className="list-group list-group-flush w-100">
          { 
            customers
            .map(customer => 
              <li 
                key={customer.uid} 
                className={`list-group-item ${customer.uid === selectedCustomer ? 'active':''}`} 
                onClick={() => this.props.selectCustomer(customer.uid)}>{customer.name} </li>)
          }                
        </ul>
      )
    }
  }
}

export default Agent;
