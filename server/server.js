import { WebSocketServer } from "ws";
import * as validation from "@set-online/shared"

const port = 1515;
const wsUri = `ws://localhost:${port}`
const server = new WebSocketServer({ port });
const clients = new Map();

const BOARD_START_SIZE = 12;
const NUM_CARDS = 81;
let board = [];


server.on('connection', (socket) => {
    console.log('Client connected');
    clients.set(socket, [])

    if (board.length === 0) {
        board = generateBoard()
    }

    socket.send(JSON.stringify({ type: "board-update", board }))

    socket.on('message', (message) => {
        const cardValues = JSON.parse(message).cards
        clients.get(socket).push(cardValues);
        console.log(`Received: ${cardValues}`);

        if (cardValues.length === 3 && validation.checkSet(...cardValues)) {
            board = board.filter((val) => !cardValues.includes(val))
        }
        socket.send(JSON.stringify({ type: "board-update", board }))
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
})

function generateBoard() {
    const uniqueCards = new Set()
    while (uniqueCards.size < BOARD_START_SIZE) {
        const num = Math.floor(Math.random() * NUM_CARDS)
        uniqueCards.add(num)
    }

    return Array.from(uniqueCards)
}

console.log('WebSocket server is running on', wsUri)