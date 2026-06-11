const port = 1515

let connected = false;
const ws = new WebSocket(`ws://localhost:${port}`)

function connect() {
    if (connected) return
    connected = true;

    ws.addEventListener("open", () => {
        console.log("CONNECTED")
    })
}

export { connect }


