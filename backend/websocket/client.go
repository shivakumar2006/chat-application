package Customwebsocket

import (
	"sync"

	"github.com/gorilla/websocket"
	"golang.org/x/tools/go/analysis/passes/defers"
)

type Client struct {
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type int    `json: "type"`
	Body string `json: "body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Pool.Close()
	}{}

	for {
		msgType, msg, err := c.Conn.ReadMessage();
		if err != nil {
			fmt.Println(err)
			return 
		}
		m := Message(Type: msgType, Body: string(msg))

		c.Pool.Broadcast <- m

		fmt.Println("msg received===>>>\n", m)
	}
}
