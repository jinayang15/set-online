
/**
 * 
 * @param {string[]} 
 * @returns {number} The number of sets on the board 
 */
function countSets(board) {
    return board.length
}

function checkSet(cards) {
    return cards.length === 3
}

export { countSets, checkSet }
