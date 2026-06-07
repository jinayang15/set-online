import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const port = 1515

const doc = new Y.Doc()
const canvas = doc.getArray('canvas');
let connected = false;
const wsProvider = new WebsocketProvider(`ws://localhost:${port}`, 'shared-canvaas', doc, { connect: false })
const clientId = wsProvider.awareness.clientID

function connect() {
    if (connected) return
    connected = true;

    doc.transact(() => {
        canvas.delete(0, canvas.length)
    })

    wsProvider.on('status', event => {
        console.log(event.status)
        console.log("clientId", clientId)
    })

    wsProvider.on('sync', isSynced => {
        console.log("synced:", isSynced)
    })

    wsProvider.connect()
}

function handleMouseDown(e, isDrawing, tool, color = "#000000") {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    doc.transact(() => {
        let lineMap = new Y.Map()
        let pointsArray = new Y.Array()

        pointsArray.push([pos.x, pos.y])
        lineMap.set("clientId", clientId)
        lineMap.set("tool", tool)
        lineMap.set("color", color)
        lineMap.set("points", pointsArray)
        canvas.push([lineMap])
    })

}

function handleMouseMove(e, isDrawing) {
    if (!isDrawing.current) {
        return;
    }

    // prevent scrolling on touch devices
    e.evt.preventDefault()

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let canvasArray = canvas.toJSON()
    let lastLineIdx = canvas.toJSON().findLastIndex((e) => e.clientId === clientId)
    console.log("canvasArray", canvasArray)
    doc.transact(() => {
        let lastLinePoints = canvas.get(lastLineIdx).get("points")
        lastLinePoints.push([point.x, point.y])
    })
}

function handleMouseUp(isDrawing) {
    isDrawing.current = false;
}

function clearCanvas() {
    doc.transact(() => {
        canvas.delete(0, canvas.length)
    })
}

export { canvas, connect, handleMouseDown, handleMouseMove, handleMouseUp, clearCanvas }


