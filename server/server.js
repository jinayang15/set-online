import { WebSocketServer } from "ws";
import * as Y from 'yjs'

const port = 1515;
const wsUri = `ws://localhost:${port}`
const server = new WebSocketServer({ port });
const clients = new Map();

const gridSize = 10;
const ydoc = new Y.Doc();
const sharedGrid = ydoc.getArray('shared grid');

for (let i = 0; i < gridSize; i++) {
    sharedGrid.push([Y.Array.from(new Array(gridSize).fill("#FFFFFF"))]);
}

sharedGrid.observe(event => {
    console.log('delta:', event.change.delta)
})

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