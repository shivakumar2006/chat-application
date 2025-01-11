package main

import (
	Customwebsocket "chatApplication/backend/websocket"
	"log"
	"net/http"
	"os"
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
	// Get the port from the environment variable (Heroku) or fallback to 9000 for local
	port := os.Getenv("PORT")
	if port == "" {
		port = "9000" // Default port for local development
	}

	setupRoutes()
	// Start the server on the dynamically assigned port
	log.Printf("Server starting on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func setupRoutes() {
	log.Println("This is Working...")
	pool := Customwebsocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serverWs(pool, w, r)
	})
}
