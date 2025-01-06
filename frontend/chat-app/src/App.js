import { Component } from 'react';

import Header from './components/Header';
import { ChatHistory,ChatInput }  from './components';


import './App.css';
import { connect, sendMsg } from './api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      ChatInput: []
    }
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Messages from user...");
      this.setState(prevState => ({
        ChatHistory:[...prevState.ChatHistory, msg]
      }))
      console.log(this.state)
    })
  }

  send(event) {
    if (event.keyCode === 13) {
      sendMsg(event.target.value)
      event.target.value = ''
    }
  }

  render() {
  return (
    <div className="App">
      <Header />
      <ChatHistory ChatHistory={this.state.ChatHistory} />
      <ChatInput send={this.send} />
    </div>
  );
}
}

export default App;
