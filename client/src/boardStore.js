let board = [];
let listeners = [];

const boardStore = {
    loadBoard(message) {
        board = [...message.board]
        emitChange()
    },
    subscribe(listener) {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    },
    getSnapshot() {
        return board;
    }
}

function emitChange() {
    for (let listener of listeners) {
        listener()
    }
}

export default boardStore;