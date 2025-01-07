const socket = new WebSocket('ws://127.0.0.1:9000/ws');

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