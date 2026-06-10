import { WebSocketServer } from "ws";

const port = 1515;
const wsUri = `ws://localhost:${port}`
const server = new WebSocketServer({ port });
const clients = new Map();

const gridSize = 10;

server.on('connection', (socket) => {
    console.log('Client connected');
    clients.set(socket, [])

    socket.on('message', (message) => {
        clients.get(socket).push(message)
        console.log(`Received: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
})

console.log('WebSocket server is running on', wsUri)