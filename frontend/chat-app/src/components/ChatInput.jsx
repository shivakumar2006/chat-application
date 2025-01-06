import React from 'react';
import './ChatInput.css';

const ChatInput = ({ send }) => {
  return (
    <div className='ChatInput'>
      <input 
        onKeyDown={send} 
        placeholder='Message...' 
      />
    </div>
  );
};

export default ChatInput;
 