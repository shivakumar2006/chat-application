import React, { Component } from "react";
import './ChatHistory.css';
import PropTypes from "prop-types";
import Message from "./Message";

class ChatHistory extends Component {
  render() {
    const messages = this.props.chatHistory.map((msg, index) => (
      <Message key={index} message={msg} />
    ));

    return (
      <div className="ChatHistory">
        <h2>Chat History</h2>
        {messages}
      </div>
    );
  }
}

ChatHistory.defaultProps = {
  chatHistory: []  // Default value for chatHistory if not passed
};

ChatHistory.propTypes = {
  chatHistory: PropTypes.array.isRequired,  // Ensures chatHistory is an array
};

export default ChatHistory;
