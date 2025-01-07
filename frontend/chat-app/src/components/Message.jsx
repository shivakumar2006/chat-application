import React, { Component } from "react";
import './Message.css';

class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className="message">
        {message.Body}  {/* Assuming your message object has a Body field */}
      </div>
    );
  }
}

export default Message;
