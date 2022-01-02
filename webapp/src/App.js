
import './App.css';
import { useState, useEffect } from 'react';

import socket from './socket';

//
function App() {
  const [allMessages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on("all-messages", (messages) => {
      setMessages(messages)
    });
  
    socket.on("connect", () => {});

    socket.on("add-message", (message) => {
    setMessages((messages) => {
      return [...messages, message]
    })
  });
  }, [])
 
  function onChange(event) {
    setInput(event.target.value);
  }

  function sendMesasge() {
    setMessages([...allMessages, input]);
    socket.emit("add-message", input);
    setInput('');
  }

  return (
    <div className="App">
      <div className="messages">{allMessages && allMessages.map((message, index) => <div key={index}>{message}</div>)}</div>
      <div className="message-input">
        <input value={input} onChange={onChange} /> 
        <button onClick={sendMesasge}>Send</button>
        </div>
    </div>
  );
}

export default App;
