import React, { Component } from "react";
class Layout extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>{this.props.state.users}</div>
        <div
          style={{ color: "green" }}
          className="animated infinite flash delay-5s"
        >
          {this.props.state.typing
            ? this.props.state.typeUser + "is typing..."
            : ""}
        </div>
        <div className={this.props.classes.chatmsg}>
          {this.props.state.chate.map((msg, index) => {
            return (
              <div key={index} className={this.props.classes.message}>
                <span>
                  <span
                    style={{
                      color: "green",
                      textTransform: "capitalize"
                    }}
                  >
                    {msg.handle}
                  </span>
                  <br />
                  <span>{msg.message}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Layout;