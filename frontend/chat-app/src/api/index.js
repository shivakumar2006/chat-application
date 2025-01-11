const socket = new WebSocket('wss://chat-application-2-20ig.onrender.com/ws');



let connect = (cb) => {
  console.log("Connecting...");

  socket.onopen = () => {
    console.log("websocket connected successfully...");
  }

  socket.onmessage = (msg) => {
    console.log("message from socket...", msg)
    cb(msg);
  }

  socket.onclose = (event) => {
    console.log("websocket connection closed...", event)
  }

  socket.onerror = (error) => {
    console.log("websocket error...", error); 
  }
}

let sendMsg = (msg) => {
  console.log("msg send : ", msg);
  socket.send(msg)
}

export { connect, sendMsg };