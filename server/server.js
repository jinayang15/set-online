import { WebSocketServer } from "ws";
import * as validation from "@set-online/shared"
import { shuffleInPlace, countSets } from "@set-online/shared/utils.js";

const port = 1515;
const wsUri = `ws://localhost:${port}`
const server = new WebSocketServer({ port });
const clients = new Map();

const BOARD_START_SIZE = 12;
const NUM_CARDS = 81;
let board = [];
let remainingDeck = [];


server.on('connection', (socket) => {
    console.log('Client connected');
    clients.set(socket, [])

    if (board.length === 0) {
        [board, remainingDeck] = generateBoard()
    }

    socket.send(JSON.stringify({ type: "board-update", board, isGameEnd: false }))

    socket.on('message', (message) => {
        const cardValues = JSON.parse(message).cards
        clients.get(socket).push(cardValues);
        console.log(`Received: ${cardValues}`);

        if (cardValues.length === 3 && validation.checkSet(...cardValues)) {
            for (let i = 0; i < board.length; i++) {
                if (cardValues.includes(board[i])) {
                    if (remainingDeck.length > 0) {
                        board[i] = remainingDeck.pop();
                    } else {
                        board.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        while (remainingDeck.length > 0 && (board.length < BOARD_START_SIZE || countSets(board) == 0)) {
            board.push(...remainingDeck.splice(-3));
        }
        console.log(remainingDeck > 0)
        console.log(board.length < BOARD_START_SIZE)
        console.log(countSets(board))
        console.log("sending msg to client...")

        socket.send(JSON.stringify({
            type: "board-update",
            board,
            isGameEnd: countSets(board) === 0 && remainingDeck.length === 0
        }))
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
})

function generateBoard() {
    let remainingDeck, board;
    do {
        remainingDeck = Array.from({ length: NUM_CARDS }, (_, i) => i);
        shuffleInPlace(remainingDeck);
        // minor optimization to splice from back
        board = remainingDeck.splice(-BOARD_START_SIZE, BOARD_START_SIZE);
    } while (countSets(board) === 0);

    return [board, remainingDeck];
}

console.log('WebSocket server is running on', wsUri)