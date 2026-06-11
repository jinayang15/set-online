import { WebSocketServer } from "ws";

const port = 1515;
const wsUri = `ws://localhost:${port}`
const server = new WebSocketServer({ port });
const clients = new Map();
let board = [];

server.on('connection', (socket) => {
    console.log('Client connected');
    clients.set(socket, [])

    if (board.length === 0) {
        board = [0, 1, 2]
    }

    socket.send(JSON.stringify({ type: "board-update", board }))

    socket.on('message', (message) => {
        clients.get(socket).push(message)
        console.log(`Received: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
})

console.log('WebSocket server is running on', wsUri)