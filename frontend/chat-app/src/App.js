import React, { Component } from 'react';
import Header from './components/Header';
import { ChatHistory, ChatInput } from './components';
import './App.css';
import { connect, sendMsg } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChatHistory: []  // Initialize chat history as an empty array
    };
  }

  componentDidMount() {
    connect((msgEvent) => {
      // Log the message to check the structure
      console.log("Message received from WebSocket:", msgEvent);
      
      // Extract and parse the message data
      try {
        const msg = JSON.parse(msgEvent.data);  // msgEvent.data is the raw JSON string
        console.log("Parsed Message:", msg);  // Verify the parsed message
        
        // Update state with new chat history
        this.setState(prevState => ({
          ChatHistory: Array.isArray(prevState.ChatHistory) ? [...prevState.ChatHistory, msg] : [msg]
        }));
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    });
  }

  send(event) {
    if (event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.ChatHistory} /> {/* Ensure prop name matches */}
        <ChatInput send={this.send} />
      </div>
    );
  }
}

export default App;
