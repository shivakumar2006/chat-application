var socket = new WebSocket("ws://localhost:9000/ws"); 

let connect = (cb) => {
    console.log("connecting...");

    socket.onopen = () => {
        console.log("websocet connected successfully...")
    }

    socket.onmessage = (msg) => {
        console.log("message from socket...", msg)
    }

    socket.onclose = (event) => {
        console.log("bsocket connection closed...", event);
    }

    socket.onerror = (error) => {
        console.log("websocket error...", error)
    }
} 

let sendMsg = (msg) => {
    console.log("msg send : ", msg)
    socket.send(msg);
}

export {connect, sendMsg};