// searchAlgorithms.js
let searchTarget;

function computeLinearSearchSteps(array) {
    let elements = [];

    // Pick a random element from the array as the target to search for
    searchTarget = array[Math.floor(Math.random() * array.length)];

    for (let i = 0; i < array.length; i++) {
        elements.push({ type: 'compare', index: i, target: searchTarget, array: [...array] });

        if (array[i] === searchTarget) {
            elements.push({ type: 'found', index: i, target: searchTarget, array: [...array] });
            break;
        }
    }

    steps = elements;
}