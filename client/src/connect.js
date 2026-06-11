import boardStore from "./boardStore";
const port = 1515

let connected = false;
const ws = new WebSocket(`ws://localhost:${port}`);

function connect() {
    if (connected) return;
    connected = true;

    ws.addEventListener("open", () => {
        console.log("CONNECTED")
    })

    ws.addEventListener("message", (e) => {
        console.log(e.data)
        const message = JSON.parse(e.data)
        if (message.type === "board-update") boardStore.loadBoard(message)
    })
}

function sendSet(cards) {
    if (cards.length !== 3) throw new Error("Incorrect number of cards")

    ws.send(JSON.stringify(cards))
}

export { connect, sendSet }


