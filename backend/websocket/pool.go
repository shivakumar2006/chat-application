package Customwebsocket

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Close() {
	// Close the channels to ensure no further communication is possible
	close(pool.Register)
	close(pool.Unregister)
	close(pool.Broadcast)

	// Optionally clear the Clients map
	pool.Clients = nil

	fmt.Println("Pool closed successfully")
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Total connections in pool:", len(pool.Clients))
			for k := range pool.Clients {
				k.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined"})
			}

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Total connections in pool:", len(pool.Clients))
			for k := range pool.Clients {
				k.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected"})
			}

		case msg := <-pool.Broadcast:
			fmt.Println("Broadcasting message")
			for k := range pool.Clients {
				if err := k.Conn.WriteJSON(msg); err != nil {
					fmt.Println("Error broadcasting message:", err)
					return
				}
			}
		}
	}
}
