import { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import { ChatInput } from './components';
import './App.css';
import { sendMsg } from './api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      ChatInput: []
    }
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
      <ChatInput send={this.send} />
    </div>
  );
}
}

export default App;
