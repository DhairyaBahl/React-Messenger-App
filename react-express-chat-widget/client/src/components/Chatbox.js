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
      // simple mapping of array from props
        return (
          <div className='col-xl-12'>
            { 
              chat
              .map(chat => 
                <div key={chat.id} className="message">
                  <div className={
                    `${chat.receiver !== agentUID ? 'balon1': 'balon2'} p-3 m-1`
                    }>
                    {chat.text}
                  </div>
                </div>)
            }  
          </div>
        )
      }
    }
  }
  