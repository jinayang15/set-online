
/**
 * 
 * @param {number[]} board An array of cards making up the board 
 * @returns {number} The number of sets on the board 
 */
function countSets(board) {
    return board.length
}


/**
 * Checks if a set of cards make up a set
 * @param {number[]} cards An array of cards represented by IDs 
 * @returns {boolean | null} null if cannot evaluate, true if the cards make up a set, false otherwise
 */
function checkSet(cards) {
    if (cards.length !== 3) return null

    return cards.reduce((acc, cur) => acc + cur) % 3 === 0
}

export default { countSets, checkSet }
