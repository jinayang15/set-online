import boardStore from "./boardStore";
const port = 1515

let connected = false;
let ws;

let isAwaitingServer = false;
let serverListeners = [];

const isAwaitingServerStore = {
    setIsAwaitingServer(bool) {
        isAwaitingServer = bool
        emitChange()
    },
    subscribe(listener) {
        serverListeners = [...serverListeners, listener];
        return () => {
            serverListeners = serverListeners.filter(l => l !== listener)
        }
    },
    getSnapshot() {
        return isAwaitingServer;
    }
}

function emitChange() {
    for (let listener of serverListeners) {
        listener()
    }
}

function connect() {
    if (connected) return;
    ws = new WebSocket(`ws://localhost:${port}`);
    connected = true;

    ws.addEventListener("open", () => {
        console.log("CONNECTED")
    })

    ws.addEventListener("message", (e) => {
        isAwaitingServerStore.setIsAwaitingServer(false);
        console.log(e.data)
        const message = JSON.parse(e.data)
        if (message.type === "board-update") {
            boardStore.loadBoard(message.board, message.isGameEnd)
        }
    })
}

function sendSet(cards) {
    if (cards.length !== 3) throw new Error("Incorrect number of cards")

    isAwaitingServerStore.setIsAwaitingServer(true);
    ws.send(JSON.stringify({ "cards": cards }))
}

export { connect, sendSet, isAwaitingServerStore }


