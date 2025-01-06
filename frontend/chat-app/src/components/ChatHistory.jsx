import React, { Component } from 'react';
import './ChatHistory.css';
import Message from './Message';

class ChatHistory extends Component {
    render() {
        const messages = this.props.ChatHistory.map(msg => <Message key={msg.timestamp} Message={msg.data} />);
            console.log(messages)
        return (
            <div className='ChatHistory'>
                <h2>ChatHistory</h2>
                {messages }
            </div>
        )
    }
} 

export default ChatHistory;