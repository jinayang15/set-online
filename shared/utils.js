
/**
 * 
 * @param {number[]} board An array of cards making up the board 
 * @returns {number} The number of sets on the board 
 */
export function countSets(board) {
    return board.length
}


/**
 * Checks if a set of cards make up a set
 * @param {number[]} cards An array of cards represented by IDs 
 * @returns {boolean | null} null if cannot evaluate, true if the cards make up a set, false otherwise
 */
export function checkSet(id1, id2, id3) {
    const divisors = [1, 3, 9, 27]
    for (const div of divisors) {
        // each card is represented in base 3, but the id is in base 10
        const trait1 = Math.floor(id1 / div) % 3
        const trait2 = Math.floor(id2 / div) % 3
        const trait3 = Math.floor(id3 / div) % 3

        // check for all different traits or all same traits
        if ((trait1 + trait2 + trait3) % 3 !== 0) {
            return false
        }
    }

    return true
}

export default { countSets, checkSet }
