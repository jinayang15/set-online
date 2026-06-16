
/**
 * Given a board with cards represented by IDs, calculate the number of sets on the board
 * @param {number[]} board An array of cards making up the board 
 * @returns {number} The number of sets on the board 
 */
export function countSets(board) {
    let numSets = 0

    for (let i = 0; i < board.length; i++) {
        for (let j = i + 1; j < board.length; j++) {
            const thirdCard = completeSet(board[i], board[j]);

            // indexOf > j ensures we only count the set once (where i < j < k)
            if (board.indexOf(thirdCard) > j) {
                numSets++;
            }
        }
    }
    return numSets
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

/**
 * Given the first two cards of a SET, calculate the id of the third card 
 * based on its traits
 * @param {integer} id1 
 * @param {integer} id2 
 * @returns {integer} id3 that represents the last card to make a SET
 */

export function completeSet(id1, id2) {
    let id3 = 0
    const divisors = [1, 3, 9, 27]
    for (const div of divisors) {
        const trait1 = Math.floor(id1 / div) % 3
        const trait2 = Math.floor(id2 / div) % 3

        // calculate the trait of the third card based on the traits
        // of the other two cards
        const trait3 = trait1 === trait2 ? trait1 : 3 - trait1 - trait2;
        id3 += trait3 * div
    }

    return id3
}


/**
 * Shuffles an array in-place using the Fisher-Yates shuffle algorithm
 * @param {any[]} array 
 * @returns The shuffled array
 */
export function shuffleInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default { countSets, checkSet, completeSet, shuffleInPlace }