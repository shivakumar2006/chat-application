package main

import (
	Customwebsocket "chatApplication/backend/websocket"
	"log"
	"net/http"
)

func serverWs(pool *Customwebsocket.Pool, w http.ResponseWriter, r *http.Request) {
	conn, err := Customwebsocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Customwebsocket.Client{
		Conn: conn,
		Pool: pool,
	}
	pool.Register <- client
	client.Read()
}

func main() {
	setupRoutes()
	http.ListenAndServe(":9000", nil)
}

func setupRoutes() {
	log.Println("This is Working...")
	pool := Customwebsocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serverWs(pool, w, r)
	})
}
