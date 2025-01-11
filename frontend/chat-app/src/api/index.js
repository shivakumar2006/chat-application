const socket = new WebSocket('wss://8d75-2402-8100-27f1-d7ed-8d44-2eb1-c6d-5d28.ngrok-free.app/ws');


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