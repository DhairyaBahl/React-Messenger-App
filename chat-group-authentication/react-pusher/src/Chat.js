import React, { Component } from 'react'
// Import CSS styles for Chat page
import './Chat.css'
// Import Bootstrap components from react-bootstrap
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
// Import the axios library
import axios from 'axios'
// Import the Pusher JS library
import Pusher from 'pusher-js'

class Chat extends Component {
  // The state is initialized in the constructor and the functions below are bound with 'this'.
  constructor() {
    super();
    this.state = {
        value: '',
        username: '',
        messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
}
// componentWillMount() is invoked immediately before mounting occurs and we are setting the username state to the value gotten from the localStorage.
componentWillMount() {
    this.setState({ username: localStorage.username });
    // Establish a connection to Pusher.
    this.pusher = new Pusher('APP_KEY', {
        authEndpoint: '/pusher/auth',
        cluster: 'YOUR_CLUSTER',
        encrypted: true
    });
    // Subscribe to the 'private-reactchat' channel
    this.chatRoom = this.pusher.subscribe('private-reactchat');
}
// componentDidMount() is invoked immediately after a component is mounted. Listen for changes to the 'messages' state via Pusher and updates it.
componentDidMount() {
    this.chatRoom.bind('messages', newmessage => {
        this.setState({messages: this.state.messages.concat(newmessage)})
    }, this);

}
// Used to update the value of the input form in which we type in our chat message
handleChange(event) {
    this.setState({value: event.target.value});
}
// This sends the message inside the input form and sends it to Pusher.
sendMessage(event) {
    event.preventDefault();
    if (this.state.value !== '') {
        axios.post('/message/send', {
            username: this.state.username,
            message: this.state.value
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.setState({value: ''})
    }
    else {
        // console.log('enter message')
    }
}
render() {
    // Renders the chat messages
    const messages = this.state.messages;
    const message = messages.map(item => {
        return (
            <Grid>
                {message}
                <Row className="show-grid">
                    <Col xs={12}>
                        <div className="chatmessage-container">
                            <div key={item.id} className="message-box">
                                <p><strong>{item.username}</strong></p>
                                <p>{item.message}</p>
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                )
            })
            // Renders the input form where the message to be sent is typed.
            return (
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                        {message}
                        <div className="chat-container">
                            <form onSubmit={this.sendMessage}>
                                <Col xs={5} xsOffset={3}>
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter message here"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <input className="btn btn-primary" value="Send" type="submit" />
                                    </Col>
                                    </form>
                                    <h4 className="text-center">Welcome, {this.state.username}</h4>
                                    <h5 className="text-center">Begin chatting here.</h5>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                )
            }
        }
        
        export default Chat;