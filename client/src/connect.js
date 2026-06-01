import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const port = 1515
// let socket;

let gridSize = 10;
const doc = new Y.Doc()
const grid = doc.getArray('grid');
let connected = false;
const wsProvider = new WebsocketProvider(`ws://localhost:${port}`, 'shared-grid', doc, { connect: false })

function connect(initGridSize) {
    gridSize = initGridSize;

    if (connected) return connected = true;

    wsProvider.on('status', event => {
        console.log(event.status)
    })

    wsProvider.on('sync', isSynced => {
        console.log("synced:", isSynced)
        console.log(grid.toArray())

        if (isSynced && grid.length === 0) {
            doc.transact(() => {
                for (let i = 0; i < gridSize * gridSize; i++) {
                    grid.push(["#FFFFFF"])
                }
            })
        }
    })

    wsProvider.connect()
}


function sendPaint(color, row, col) {
    const index = gridSize * row + col
    console.log(color, row, col)
    doc.transact(() => {
        grid.delete(index, 1)
        grid.insert(index, [color])
    })
}

export { grid, connect, sendPaint }

// export function connect() {
//     socket = new WebSocket(`ws://localhost:${port}`)

//     // Executes when the connection is successfully established.
//     socket.addEventListener('open', event => {
//         console.log('WebSocket connection established!');
//     });

//     // Listen for messages and executes when a message is received from the server.
//     socket.addEventListener('message', event => {
//         console.log('Message from server: ', event.data);
//     });

//     // Executes when the connection is closed, providing the close code and reason.
//     socket.addEventListener('close', event => {
//         console.log('WebSocket connection closed:', event.code, event.reason);
//     });

//     // Executes if an error occurs during the WebSocket communication.
//     socket.addEventListener('error', error => {
//         console.error('WebSocket error:', error);
//     });
// }


